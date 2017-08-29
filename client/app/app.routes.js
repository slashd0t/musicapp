"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var about_component_1 = require("./components/about/about.component");
var home_component_1 = require("./components/home/home.component");
exports.rootRouterConfig = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'about', component: about_component_1.AboutComponent }
];
//# sourceMappingURL=app.routes.js.map