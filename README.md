# SmoochDesk

A sample business system built with Meteor and the Smooch API.

_**Intended use:** This code is a proof of concept and is not meant to be used in production. It should be used as a reference only to create your own implementation._

![screen shot 2017-05-02 at 12 14 59 pm](https://cloud.githubusercontent.com/assets/2235885/25628184/53bf3b0c-2f33-11e7-99f2-1ded2e733c02.png)


## How do you run this?

1. Install meteor

    `curl https://install.meteor.com/ | sh`

2. Clone this repository

    `git clone https://github.com/smooch/smooch-desk.git`

3. In the _smooch-desk_ directory, run `npm install` and `meteor npm install`

4. Configure a [Smooch webhook](https://app.smooch.io/integrations/webhook) to send "_All Triggers_" to your smoochDesk app at the "/hook" route

5. Using the _settings.json.example_ file as a guide, create a _settings.json_ file and populate the missing fields:
  
    - For `smoochSecretKey` and `smoochKeyId`: You need an *account* level key, found under https://app.smooch.io/account. (If your `smoochKeyId` has an `app_` prefix, it won't work)

    - The `smoochAppId` can be found in your app's settings page.

6. Run it:

    `meteor --settings settings.json`

    You can visit "/web-messenger" to send test messages as an end-user

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

Comment:
```
find server client -not \( -path client/compatibility -prune \) -type f -name '*.js' -print0 | xargs -0 sed -i '' 's/\(\/\*\*.*\*\/$\)/\1\/\*/g'
```

Uncomment:
```
find server client -not \( -path client/compatibility -prune \) -type f -name '*.js' -print0 | xargs -0 sed -i '' 's/\(\/\*\*.*\)\/\*$/\1/g'
```
