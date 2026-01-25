# OSEDA Course Contributing Guide

## Welcome

Welcome to the OSEDA Course Contributing Guide, and thank you for your interest.

## OSEDA overview

The purpose of the OSEDA is to provide a templating, feedback, and distribution platform for open source presentations.
You can add a course to [oseda.net](oseda.net) using the [OSEDA command line interface](github.com/oseda-dev/oseda-cli).
Course's that do not following this contributing guide will not be accepted.

## Ground rules

Before contributing, read our [Code of Conduct](./CODE_OF_CONDUCT.md) to learn more about our community guidelines and expectations.

## Share ideas

To share your new ideas for the project, perform the following actions:

1. Visit the most appropriate OSEDA repository.
2. Ensure the idea does not already have a relevant discussion issue.
3. Create an issue to discuss your idea.

## Environment setup

To set up your environment, perform the following actions:

* Unix environment (Linux preferred)
* Git (signed into Github)
* Cargo
* NPM


# Install `oseda-cli`

OSEDA projects are generated using the oseda-cli. This can be installed through cargo.

```bash
cargo install oseda-cli
```

If you have cargo installations in your `$PATH`, you will have access to the `oseda` binary.
You can use the `oseda` command to build your presenatations.

Use the `oseda init` command to create your first project. 
This will walk you through a list of interactive options regarding your presentation.
Any of these options can be changed at later time if needed.


## Template:
OSEDA presentations can be made entirely in markdown, but HTML provides the most flexibility.

## Title:
Give your course a good name

## Tags:
Select from any predefined tags. 
You can always add custom tags later, but only the predefined tags will get a unique color on oseda.net

## Color:
Select a theme color for your course (e.g. Math=Red, Science=Blue, etc)

After running `oseda init`, you will have a new directory with the name of your project.
Take a look at the structure of an OSEDA project

```
OSEDA-Project-Name 
├── css
│   └── custom.css
├── index.html
├── oseda-config.json
├── package-lock.json
├── package.json
├── public
│   └── ferris.png
├── slides
│   └── slides.html
├── src
│   └── main.js
└── vite.config.js
```
If you selected the markdown template, you will instead have a `slides.md` file.

## `oseda-config.json`

This file contains the OSEDA project information. It should look something like:
```
{
  "title": "ProgrammingFlyingMachines",
  "author": "ReeseHatfield",
  "tags": [
    "Aerospace",
    "ComputerScience"
  ],
  "last_updated": "2026-01-25T22:34:30.097833938Z",
  "color": "#FF0000"
}
```
You can edit these fields as you see fit, but note that your author *MUST* match your Github username.
If you are unsure, check this with `git config --list`

If everything looks right, you may now run the `oseda run` command from the project directory.
Open that link in your browser to view the default presentation.

You may now edit the course files (usually just the `slides.html/md`) to fit your desired course.

You can leave it there if you only want the course for personal reasons, but if you would like to add your course to oseda.net, a few things must be done.

1. Ensure your project is ready for deployment with the `oseda check` command.

2. Run `oseda fork`. This will open the fork website for the course repository repo.
Once this is forked to your personal Github, copy the link to the fork and continue. 

3. Run `oseda deploy [FORK_URL]`. 
This will add your course to your personal fork.
(Don't worry, this will not do a full `git clone`, only a `sparse checkout` without pulling down every course).

4. Open the final link given to you after `oseda deploy` runs and make a PR.

5. The OSEDA core team will consider your course for approval. 

In a few days, you should expect to see the course available at oseda.net

