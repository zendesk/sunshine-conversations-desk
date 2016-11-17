# SmoochDesk

A sample business system built with Meteor and the Smooch API.

## How do you run this?

1. Install meteor

  `curl https://install.meteor.com/ | sh`

2. Clone this thing

  `git clone https://github.com/gozman/SmoochDesk.git`

3. Configure a webhook:

  Configure a Smooch webhook to send appUser messages to your smoochDesk app at the "/hook" route

4. Configure your secret keys

  In _sever/messages.js_ add your Smooch keyId and secret

5. Run it:

  `meteor run`

## Based on Meteor Slack

This project's structure and UI is based on work done by [@timbrandin] as part of his [Meteor Slack](https://slides.com/timbrandin/meteor-slack) project. Substantial changes have been made since to repurpose the project for use as a Smooch "business system" example. As such, this code is made available under the GPL.

### License

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
MA  02110-1301, USA.

-------
