# GyroPalm JavaScript SDK
JavaScript SDK for GyroPalm Developers

## Overview ##
The GyroPalm JavaScript software development kit (SDK) enables developers to wirelessly connect to one or more GyroPalm Encore wearables without any additional dependencies. This JS library includes methods to enable developers in establishing bi-directional communication with GyroPalm devices for creating unlimited hands-free web interactions. This repository also contain an example HTML page that demonstrates typical use.

This library exposes the GyroPalm object, which encapsulates secure websockets (WSS) with our real-time low latency server. Using enhanced methods and function callbacks, gestures, commands, and other data can be retrieved from the wearable in milliseconds. Using the GyroPalm object, developers can write applications that retrieve information about a user as well as their wearables.

## Requirements ##
To implement this SDK for its intended use, it is highly recommended that the developer has a GyroPalm Developer Kit or equivalent GyroPalm package to do proper testing. To order one or more wearables, visit the [GyroPalm Online store](https://store.gyropalm.com).

In addition, both the end-user must use a modern web browser such as Chrome, Firefox, Edge, or Safari with HTML5 capabilities. The developer may choose to use jQuery or equivalent library alongside this SDK for convenience, but it is not required.

## Installation ##
There are three simple ways to include this library: By referencing our CDN hosted version, using GyroPalm's hosted version, or downloading the latest release from GyroPalm's GitHub repository.

### CDN Hosted Link ###
To use the CDN Hosted Link, include the following in your HTML:
```html
<script src="https://cdn.jsdelivr.net/gh/GyroPalm/GyroPalm-JavaScript-SDK@latest/gyropalm.min.js"></script>
```

### GyroPalm Hosted Link ###
To use the GyroPalm Hosted Link, include the following in your HTML:
```html
<script src="https://app.gyropalm.com/api/sdk/javascript/gyropalm.min.js"></script>
```

### Download Release from GitHub ###
Download the latest release of `gyropalm.min.js` on the [GitHub releases page](https://github.com/GyroPalm/GyroPalm-JavaScript-SDK/releases). Place the file relative to your script path and include it as follows:
```html
<script src="gyropalm.min.js"></script>
```

### Full Documentation on GyroPalm SDK Docs ###
The latest documentation for GyroPalm's Javascript SDK can be found on the official [GyroPalm SDK Docs website](https://app.gyropalm.com/sdk/docs/javascript/). You will find relase notes, example code, and explanations.


## Copyright and License ##
The MIT License (MIT) Copyright (c) 2015-2024 by GyroPalm, LLC. Code written by Dominick Lee for GyroPalm.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.