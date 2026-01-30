# [oseda-backend](https://github.com/oseda-dev/oseda-core/tree/main/backend)
## Backend

This directory of oseda-core contains all of the backend code for the oseda.net

## Stack:
- ExpressJS
- Node

## Structure:

```
backend                   
├── README.md
├── package.json
└── src
    ├── server.js [entry point]
    ├── courses.js
    ├── docs.js
    ├── [Various other endpoints/modules]
    └── ...
```

## Notes:
- The frontend's build directory is served statically from the backend `server.js`
- Each course is served from its corresponded directory from the `COURSES_ROOT` configured in `server.js`