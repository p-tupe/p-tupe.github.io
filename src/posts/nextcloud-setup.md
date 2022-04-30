---
date: "2022-01-13T00:00:00Z"
title: A "from scratch" guide to setting up Nextcloud + Postgresql + Nginx secure
  reverse proxy using docker on Ubuntu 20.04
---

<blockquote>
Disclaimer: This post begins (and ends) with the assumption that you are familiar with the words in the title. If you do not know <i>any</i> of those, perhaps this isn't for you yet. If you understand <i>some</i> but not all, I highly recommend reading about them elsewhere before continuing, I'll add links to the bottom for convenience.
</blockquote>

<blockquote>
Disclaimer 2: While the aim of this post is to enable you to have a working nextcloud setup eventually, the process I go through is a tumble through many obstacles and learnings (a few of them I have mentioned here) as <i>my</i> aim was the learn docker container stuff and nginx proxy. This post is a brief recount of the same. If you wish to skip all the fluff and just want a working nextcloud instance, there are many docker-compose files out there that will get you up and running within minutes. And no, I do not use docker-compose here (or even a Dockerfile).
</blockquote>

<blockquote>
Disclaimer 3: Following assumptions are made -
<br />
1. You have a cloud instance ready. Check out the free oracle servers below.
<br />
2. You have docker installed. Again, linked at the bottom.
<br />
3. You have a domain name linked to your instance IP. (This is a requirement for HTTP secure, not essential but highly recommended)

</blockquote>

<blockquote>
Disclaimer 4: This is not a disclaimer. You have had enough disclaimers already. There will be no more.
</blockquote>

## Playing around

First off, let us see what we want at the end. Get docker installed and docker.service running in your local machine if you haven't already. Then run the following command:

```sh
sudo docker run -p 8000:80 -d nextcloud
```

The above command starts a container (an isolated process) using the nextcloud image (a set of lib/commands to run said process) in "detached" mode (in the background), binding your machine's ("host", from the container's perspective) port 8000 to the container's port 80 - that is, any data received on machine's port 8000 will be forwarded to container's port 80 and vice versa. (-p is short for \--port, -d is short for \--detached.)

You can ensure that the container is running with the following command:

```sh
sudo docker ps
```

You can ensure that the container is running _properly without errors_ with the following command:

```sh
sudo docker logs <container-id/name>
```

You will get the container id (a seemingly random alphanumeric string) or name from the `ps` command. There are also ways to name a container but that is for later. Now, assuming the container is running properly, let us see what the fuss is all about.

Open your browser and go to http://localhost:8000. You will see a nice login screen. Add a random username and password, click on submit and then explore around. _THIS_ is what we want at the end, only it will be available from the internet using a recommended database. (Spoiler: The name is in the title)

Now if you're done playing around, you can stop the container with:

```sh
sudo docker stop <container-id/name>
```

To check that your container is stopped, run the `ps` command again. You'll notice it is gone from there. It is still, however, saved to disk and ready to go anytime. To see all containers, do:

```sh
sudo docker ps -a
```

Where -a stands for all. To _remove_ a container, you'd do:

```sh
sudo docker rm <container-id/name>
```

And check with `ps -a`. Gone, right?

Anyhoo, now that we have a vision to work towards, lets... work towards it. You may try all this in your local machine (except the TLS stuff), or give it a go in your remote instance if you so wish.

## Setting up Postgresql

Alright, let us kick things off with an easy one - setting up our database. Run the following command:

```sh
sudo docker volume create postgres-data
```

Docker containers are "ephemeral". You may look the word up in the dictionary for the exact definition and expand your vocabulary. In practice, what this means for us is that all the data inside the container is purged when the container is removed. That is how they are meant to be. We kinda need our data to remain behind, even if the service stops. Thus, volumes.

A "volume" is a block of storage that is "attached" to a container. Multiple volumes can be attached to one container. They can be shared among other containers as well. More importantly, they are persistent. There are three types - unnamed, named, and bound volumes. Here we have a named volume that is managed by docker itself. It is easy to backup, share, and replicate when a volume is named. When we ran the nextcloud container above, it stored the data in an "unnamed" volume to ensure persistence across container restarts and acts of god.

All this is to say, we have a block of persistent storage named "postgres-data" somewhere on our disk now ready to be attached to our database container. Let us do that:

```sh
sudo docker run \
  -v postgres-data:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=supersecretpassword \
  --net=host --name=my-postgres --restart=unless-stopped \
  -d postgres
```

'Whoa whoa! What is all this?' you ask? Allow me to explain!

First, we ask docker to start a container with `docker run`. Then we ask it to bind our previously created volume to the directory where PostgreSQL stores data with the `-v` flag. It stands for \--volume. Then we supply the password our database will use in an environment variable named POSTGRES_PASSWORD with the -e flag. It stands for \--environment (\--env). The --name flag give our container - you guessed it, a name! We can use it to start, stop, remove or log without having to `ps` all the time (or have some weird name attached by default). Now, the \--restart flag tells docker to start the process again should it stop for any reason. Unless it was stopped manually. Finally, -d runs it in the background.

'You missed one!' Yes, I'm aware.

Remember how we used the port flag (-p) earlier to bind port 8000 to port 80? Yeah, you can expose PostgreSQL's port 5432 similarly using the -p 5432:5432 option. However, I initially planned to expose my DB instance to the world (or just me but from anywhere, you get it). Across my voyage of learning through the forums and docs, I came across information that -p flag introduces a _slight_ delay due to docker container having a separate virtual network interface (isolation, yay!) and it must do NAT for the port functionality. And the solution was `--net=host`. Now, that delay didn't _really_ matter to me but who am I to turn down easy optimizations? What the flag does is run the container on the host's network interface. All the ports and rules of the host apply to the container as well. Your machine's localhost is the container's localhost. This eliminates the NAT requirement but also removes the network isolation. If you care about it, open the port as mentioned above, and instead of "host", create a different network (like we did volume) and attach it to the container. When the same network is attached to another container (like our upcoming nextcloud one) then they can chat with each other. At this point, I had no plans to set up nginx, instead intending to allow 5432 directly in my machine. Plans change. But I was too lazy to tear down and start again. So this is how it remained. Btw, \--net is short for \--network.

Check if our PostgreSQL is up and running from previous commands. Done? Make a note of password somewhere (I hope you did not use literal supersecretpassword as password) and let's move on to the nextcloud... next. Heh.

## Setting up Nextcloud

Alright, we need another volume for nextcloud. Easy peasy:

```sh
sudo docker volume create nextcloud-data
```

And there we have it. Should you ever wish to remove a volume (as I had to do a zillion times during my experiments), just issue the following command:

```sh
sudo docker volume rm <volume-id/name>
```

'Where will I get the id/name from if I did not give them one?' you ask? Well just list 'em with this:

```sh
sudo docker volume ls
```

And should you ever wish to remove _all_ volumes that aren't being used, do:

```sh
sudo docker volume prune
```

Use with caution. This will remove volumes for _all_ removed containers. Try it in the playground terminal, where we set up our initial nextcloud container. You'll gain around 400 MBs. It is necessary to houseclean docker every now and then because this thing consumes storage like no tomorrow. Anyway, moving on to the main show:

```sh
sudo docker run \
  -e OVERWRITEWEBROOT="/nextcloud" \
  -e OVERWRITEPROTOCOL="https" \
  -v nextcloud-data:/var/www/html \
  -p 8000:80 --name=my-nextcloud --restart=unless-stopped \
  -d nextcloud
```

'I understand the flags now, but I wonder why we need those overwrite thingys' Ah, sweet bliss of ignorance. I had a lot of _fun_ getting things to work for Nextcloud behind https proxy. So much fun, that I feel I should just omit those flags and let you figure things out yourself. For the fun obviously, I swear! But I promised you'll have a working setup by the end of this post, so here we go.

We will access our nextcloud instance like so - https://yourdomain.com/nextcloud

Notice the http*s* and _/nextcloud_. By default, nextcloud assumes it is being hosted in the root of the webserver, so it uses / path for all resources. And it also assumes HTTP protocol. Our setup won't work with either default. Those two flags overwrite the defaults.

At this point, I confess I fell a bit short on reading (since I had had several hours of fun by this point), so once this worked, I stopped looking for alternatives. I am assuming there is a better way of doing what I did, as I noticed these flags being suggested as "use this if earlier didn't work". I never tried this _earlier_ option - a TRUSTED_PROXIES flag. This is left as an exercise for you, dear reader.

Now that we have our nextcloud instance running (I am going to assume you checked the logs), let us move on to the final step - setting up nginx reverse proxy.

## Setting up Nginx

I have a confession. Originally, my intention was simply to learn a few docker commands and play around with nextcloud. Eventually, I decided to host it on a virtual server instance that I recently acquired, and adding a database was trivial. The plan was to just have those two running, with nextcloud exposed on port 80 and postgres on 5432.

'But what about the other stuff you wanna deploy there eventually?' Exactly! I had the same thought - after I had both PostgreSQL and nextcloud up and running. Yes, the command you ran exposed port 8000 and had nice overwrite flags but that is what I arrived at at the very end. All this is to say, nginx reverse proxy was kinda hammered into my setup at the end. And of course, it had to be secure. All this is kinda "duh!" to you now but I was in sort of a zeal to play around with new stuff and so it sorta slipped my mind. You know how it goes.

The reason I am saying all this is that when I looked around at how the setup would look like, I found a _ton_ of docker-compose files with the nice packaged deployment of all I wanted in a single easy command. So did I do the sane thing and use docker-compose? 'Meh! How hard could it be? Just run another container.' I thought. Heh.

So I deployed an nginx docker container. I ran it on `--net=host` like postgres to offset NAT latency. Added reverse proxy for /nextcloud. Spent a few fun hours pulling my hair out over how to make it work. Eventually reaching the overwrite flag after trying out many things in the nginx config itself. NOTE: Avoid making substitutions in nginx, it can lead to unforeseen issues, including but not limited to frustration, fury, "f\*k this sh\*t, I'm becoming a farmer" moments. Simply changing the route in the proxied container is far easier _and_ simpler.

At this point, I should also mention that my remote server is hosted on Oracle (Thank you Oracle for the free stuff!), and while I had made sure to open port 80 (http) and 443 (https) in my security groups _and_ that my firewall wasn't blocking, one of the culprits of "Why the hell isn't this working?" was... iptables. Ensure that no firewalls and iptable routes are blocking access to your goodies. I used the following commands:

```sh
sudo iptables -I INPUT 6 -m state --state NEW,ESTABLISHED -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT 7 -m state --state NEW,ESTABLISHED -p tcp --dport 443 -j ACCEPT
sudo iptables -I INPUT 8 -m state --state NEW,ESTABLISHED -p tcp --dport 5432 -j ACCEPT
sudo netfilter-persistent save
sudo netfilter-persistent reload
```

Explaining the above is beyond the scope of this document. (Always wanted to say that!)

Kidding aside, the commands basically allow packets from said ports, by adding rules at specific index (notice the 6, 7, and 8) in the chain. At the end of the chain is usually REJECT. Notice port 5432? Yeah, I had to add that too for nextcloud to communicate with postgres (although port 8000 seemed to work fine for some reason, probably docker voodoo). Anyway, it is not allowed in security groups so not a big deal as far as I know. Also, during one iteration of my experiment, I simply flushed all iptable rules. Please avoid doing that, no matter how satisfying. If you want to check if all is good:

```sh
sudo iptables -L
```

Moving on to the meat of the matter, I deployed an nginx container and somehow managed to get it connected to nextcloud. All good. Now came the security part. (Kudos to Let's Encrypt EFF people, thanks for your hard work!)

It is trivial to get a security certificate. Just install certbot and let it do its thing. It not only downloads the necessary stuff but also updates them before their expiry. For free. And you don't have to do a thing! Heady stuff. There are docker images that do this for you, but having a docker container running for a cron job that does nothing but changes a couple of files every few months sounded like a bit of over-engineering to me. I decided to go non-container mode.

So, since I had nginx running already, I tried to run certbot with \--nginx command that professes to automatically set things up for you. But it apparently doesn't work for dockerized containers. No issues, just downloaded the certificates and bound the letsencrypt folder to the nginx container and got things running well. Problem? Every time I wanted to renew the expired certificates, I would have to take down the container, manually run the renew command, and then start the container.

Now, there were many ways I could go. Setup separate certbot and nginx containers with shared volumes. Or fetch an image with certbot _and_ nginx builtin that does everything. Or as mentioned above, manually renew every three months. Doesn't sound so bad? OR...

I could just non-dockerize nginx too. I was already running it on the host network, and it wasn't storing any data, so the benefits of isolating that process vs implementing other options made my choice clear, especially since I did not want to run certbot in a container.

So, download nginx using sudo apt-get and change /etc/nginx/nginx.conf to /etc/nginx/nginx.conf.bak. Open a new file nginx.conf there and add the following:

```
worker_processes  auto;

events {
  worker_connections  256;
}

http {

  # Default settings
  sendfile on;
  tcp_nopush on;
  tcp_nodelay on;
  keepalive_timeout 65;
  types_hash_max_size 2048;
  include /etc/nginx/mime.types;
  default_type application/octet-stream;

  # SSL/TLS
  ssl_session_cache   shared:SSL:10m;
  ssl_session_timeout 10m;
  ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
  ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;
  ssl_prefer_server_ciphers on;
  ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA:ECDHE-ECDSA-AES128-SHA256:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-SHA:ECDHE-RSA-AES256-SHA:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES256-SHA256;
  add_header Strict-Transport-Security "max-age=63072000" always;
  ssl_stapling on;
  ssl_stapling_verify on;

  # Gzip
  gzip on;
  gzip_vary on;
  gzip_comp_level 4;
  gzip_min_length 256;
  gzip_proxied expired no-cache no-store private no_last_modified no_etag auth;
  gzip_types application/atom+xml application/javascript application/json application/ld+json application/manifest+json application/rss+xml application/vnd.geo+json application/vnd.ms-fontobject application/wasm application/x-font-ttf application/x-web-app-manifest+json application/xhtml+xml application/xml font/opentype image/bmp image/svg+xml image/x-icon text/cache-manifest text/css text/plain text/vcard text/vnd.rim.location.xloc text/vtt text/x-component text/x-cross-domain-policy;


  # Always Secure
  server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
  }

  server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name  yourdomain.com;

    location = ^/nextcloud$ {
      return 302 /nextcloud/;
    }

    location /nextcloud/ {
      # https://docs.nextcloud.com/server/23/admin_manual/installation/nginx.html
      proxy_pass http://127.0.0.1:8000/;

      client_max_body_size    512m;
      client_body_timeout 300s;
      fastcgi_buffers 64 4K;

      proxy_redirect          off;
      proxy_set_header        Host            $host;
      proxy_set_header        X-Real-IP       $remote_addr;
      proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_connect_timeout   90;
      proxy_send_timeout      90;
      proxy_read_timeout      90;
      proxy_buffers           32 4k;
    }

    location = /.well-known/webfinger {
      return 301 https://yourdomain.com/nextcloud/index.php/.well-known/webfinger;
    }

    location = /.well-known/nodeinfo {
      return 301 https://yourdomain.com/nextcloud/index.php/.well-known/nodeinfo;
    }

    location = /.well-known/caldav {
      return 301 https://yourdomain.com/nextcloud/remote.php/dav;
    }

    location = /.well-known/carddav {
      return 301 https://yourdomain.com/nextcloud/remote.php/dav;
    }

    location ~ ^/nextcloud/(?:build|tests|config|lib|3rdparty|templates|data)(?:$|/)    {
      return 404;
    }

    location ~ ^/nextcloud/(?:\.|autotest|occ|issue|indie|db_|console) {
      return 404;
    }
  }
}

```

I have added different components in this file from several different sources. What you must focus on are the SSL/TLS section and the location redirects. Also, note that I built this config based on what I learned over a few days of frantic efforts to get things going. _I AM NOT AN EXPERT IN NGINX (OR DOCKER), TRUST BUT VERIFY!_ This is a minimal config that I worked for me:

```conf
worker_processes  auto;

events {
  worker_connections  256;
}

http {
  ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

  server {
    listen 80;
    listen 443 ssl;

    location = ^/nextcloud$ {
      return 302 /nextcloud/;
    }

    location /nextcloud/ {
      proxy_pass http://127.0.0.1:8000/;
    }
  }
```

Moving on, once you save nginx.conf, make sure it is correct using the following:

```sh
sudo nginx -t
```

Should be "ok" somewhere. If so, then:

```sh
sudo nginx -s reload
```

And your reverse proxy is up and running! But wait, you don't have the certificates yet. Try this:

```sh
sudo certbot --nginx --staging
```

If okay, remove the staging flag. This command downloads certificates and configures nginx. (It did not change my config but I had it set up from previous efforts so your mileage may vary)

To check if your renewal is working:

```sh
sudo certbot renew --dry-run
```

If okay, then give yourself a pat on the back. You did it! Enjoy the goodies on https://yourdomain.com/nextcloud/

By the way, the default username and database name of PostgreSQL are "postgres". I hope you saved the password previously. If not, no worries, just inspect your postgres container and check the environment variables section. If you're worried about security, check out docker secrets.

Also, the database host is your gateway of nextcloud instance hosted on a bridged docker network (usually docker0). You could get it by doing:

```s
sudo docker inspect my-nextcloud | grep "Gateway"
```

So instead of localhost, add 172.x.x.x:5432 and you're good to go!

## Important Links

- [Nextcloud](https://nextcloud.com)

- [Postgresql](https://www.postgresql.org/)

- [Nginx](https://nginx.org/en/)

- [Docker](https://www.docker.com/)

- [Certbot](https://certbot.eff.org/)

- [Ubuntu](https://ubuntu.com/)

- [Oracle Free Servers](https://www.oracle.com/cloud/free/)

- [Installing docker on ubuntu](https://docs.docker.com/engine/install/ubuntu/)
