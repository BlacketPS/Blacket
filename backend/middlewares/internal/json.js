import express from "express";

export default [express.json(), (err, _, res, next) => err instanceof SyntaxError ? res.json(`${err.message}.`) : next()]