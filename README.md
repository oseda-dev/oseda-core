# **oseda-core**

<p align="center">
  <a href="https://github.com/oseda-dev/oseda-core">
    <img src="https://github.com/oseda-dev/oseda-core/blob/main/frontend/public/OsedaLogoDark.png?raw=true" alt="Oseda Logo" width="400" height="370">
  </a>
</p>

<h3 align="center"><strong>Oseda-Core</strong></h3>

<p align="center">
  Core logic for [oseda.net](https://oseda.net)
  <br>
</p>

# Development

## Getting started

```
# user installs
yay -S nodejs npm git apache certbot openssl zsh

# npm gloabals
npm install -g typescript ts-node eslint prettier

# repo
git clone https://github.com/ReeseHatfield/oseda-core.git


```
You will also need the course library repository at the same level as oseda-core. E.g.
```
oseda
|-oseda-core
|-oseda-lib
```

Run with `./run.sh dev`

# Structure:

- oseda-core frontend manages the React frontend of the project. Check out the frontend README.md for more information.
- oseda-core backend manages the Express JS server for serving the frontend statically and the course repository dynamically. 
Check out the backend README.md for more information.

The CLI for generating oseda projects can be found [here](https://github.com/oseda-dev/oseda-cli)
The course library repository can be found [here](https://github.com/oseda-dev/oseda-lib)