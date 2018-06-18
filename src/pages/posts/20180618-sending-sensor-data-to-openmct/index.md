---
title: "Sending Sensor Data to OpenMCT"
date: 2018-06-18T10:21:59-05:00
tags: 
  - openmct
  - sensors
  - node
draft: true
---

This is basically a liveblog of going from raw sensor data to a new dashboard with [OpenMCT](https://github.com/nasa/openmct).

OpenMCT is a powerful data rendering tool. It can ingest any kind of timeseries data and render it in a number of different graphs and layouts. It does not have the ability to interface directly with sensors, however. As a developer, it is your responsibility to provide timeseries data to OpenMCT in a format that it can read. To do so, you'll need to develop a relay server that converts raw sensor data into a stream of information OpenMCT can access over an HTTP connection or WebSockets. A typical flow looks like this:

1. A sensor is setup and writes text data to a COM port.
2. A relay server is connected to the sensor's COM port (either directly or with something like an RS232 to USB connector)
3. The server parses raw text data and converts it to structured JSON
4. The server serves JSON over an HTTP or WebSockets connection
5. A user opens OpenMCT in their browser
6. OpenMCT has the URL of the relay server and requests sensor data
7. The server sends structured JSON server data to OpenMCT
8. OpenMCT renders the sensor data as a graph

There are two main thrusts to this work:

1. The server that parses raw sensor data and relays it out over the network
2. Adding a new widget to OpenMCT that can request data from the server and render it

In building and testing a sensor-to-OpenMCT flow, you may not have access to a physical sensor with which to test. We'll need to add another thrust to this work: building a virtual sensor for testing. Given that the rest of the work depends on a virtual sensor, let's start there.

## Building a Virtual Sensor

[GitHub Repo - analox-to-mkiiif-simular](https://github.com/cameronwp/analox-sub-mkiiif-simulator) (See the README for usage instructions)

(I'm new to hardware, so the phrasing and accuracy of this section may be incorrect. I'll revisit and correct. See [here](https://stackoverflow.com/a/27942559) and [here](https://unix.stackexchange.com/a/4132) for useful discussions.)

Serial ports (COM ports are serial ports) communicate over terminals (abbreviated as tty for TeleTYpe but usually written in lowercase). You can imagine ttys as multipurpose hoses that you can write data to and read data from. These are channels that live at the OS level, meaning that different applications and processes can communicate with one another over a tty. Both physical devices and software can create, read from, and write to ttys. Depending on the tty, you can have 0+ writers and readers on a given channel. USB and Bluetooth devices create (or at least write to) similar tty channels.

Many hardware sensors are built with female COM ports, which often use older DB9, DB15, DB25 connectors (the numbers actually refer to the number of pins in the connector). You can either connect to them with cables with male connectors, or nowadays its generally easier to connect with an RS232 to USB converter. Regardless of the method, the connection creates a new tty channel (note that the connection method will affect the name, location, and potentially the format and behavior of the tty).

When the sensor writes data to the COM port, it is written to a tty in plaintext (generally ASCII), which any process can read.

The virtual sensor I built creates two linked ttys, one we're using for reading and the other for writing (we aren't imposing a technical restriction, it's just a convention we're following). Using Node (a JavaScript runtime), it generates a stream of random data that corresponds to the output format of an [Analox Sub MK III F](https://www.analoxsensortechnology.com/gfiles/Sub%20MkIIIF%20\(ASF3\)/8xx%20-%20Reference%20Documents/ASF3-800%20%20%20Sub%20MkIIIF%20User%20Manual%20.pdf) (pg 51). It then writes that data to one of the newly created ttys. Any process can open a connection to the other tty and read the data as if it were coming from a real hardware sensor.

## Building a Relay Server

[GitHub Repo - com-to-ws](https://github.com/cameronwp/com-to-ws) (See the README for usage instructions)

The relay server is generally going to be a computer physically connected to a sensor's COM port. Depending on the scenario, you may be able to use a normal laptop or desktop to accomplish this task. However, if space is minimal or the deployment is in a location that is difficult to access, you could deploy an embeddable machine like a [Raspberry Pi](https://www.raspberrypi.org/) to relay information. The software stack and deployment method you choose should reflect the hardware limitations imposed by the situation. You'll probably want to avoid a scripting language or a language with a heavy runtime (like Node, Python, Java) if you're deploying to an embedded environment with very limited compute and memory resources. In that situation, you may want a leaner binary built with a language like C, C++, Go, or Rust. If you're running on a full-power desktop, use whatever you want!

If you have more users accessing the sensor data than your relay server can handle (as determined by testing), you may want an additional high-powered server for production. In this scenario, your smaller relay server only sends its data to the high-powered server, which clients then connect to and request sensor data from instead. If the number of users is measured in the 1s or 10s, you're probably fine without relaying to a larger server.

In my example of a relay server, I'm sticking with Node for simplicity's sake. The relay server creates a connection to a tty and waits for data to arrive. When it does, it reads and parses the text to generate a structured JS object. Then, it simply broadcasts the object over WebSockets (not fully implemented yet). Note that there are unit tests to confirm the parsing is working as expected.
