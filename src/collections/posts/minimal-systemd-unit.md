---
date: "Fri Jul 11 14:11:40 EDT 2025"
title: On setting up a systemd service
---

Say we have a long-running program `foo` that needs to run on boot and restart on failure. Here's a quick low-down on how to set it up on systems that support systemd -

1. Create a `foo.service` file:

```ini
[Unit]
Description=a foo service that does baz

[Service]
ExecStart=/usr/bin/foo
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

2. Follow the script:

```sh
# Verify correctness
systemd-analyze verify foo.service

# Copy it to systemd's dir
sudo cp foo.service /etc/systemd/system/

# Reload systemd units
sudo systemctl daemon-reload

# Start immediately, and run on boot
sudo systemctl enable foo --now
```

3. Done!

To ensure things are running as they should, check the service status:

```sh
systemctl status -u foo
```

And the logs:

```sh
journalctl -u foo
```

## Resources

- [Why `multi-user.target`](https://unix.stackexchange.com/questions/506347/why-do-most-systemd-examples-contain-wantedby-multi-user-target)

- [Systemd by example](https://systemd-by-example.com/)

- [Red Hat Docs](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/using_systemd_unit_files_to_customize_and_optimize_your_system/assembly_working-with-systemd-unit-files_working-with-systemd)

- [More notes](https://www.priteshtupe.com/notes/systemd/)
