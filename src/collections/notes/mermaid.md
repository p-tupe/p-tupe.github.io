---
modified: Mon Apr 18 23:11:58 EDT 2022
---
# Mermaid.js Diagrams

- [Mermaid Intro](https://mermaid.ai/open-source/intro/)

## State Chart

```mermaid
---
title: Simple sample
---
stateDiagram-v2
    [*] --> Still
    Still --> [*]

    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]
```


