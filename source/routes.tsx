import React, { ReactElement } from "react";
import { Auth } from "./screens/auth.js";

interface CLIRouterProps {
    command: string;
    args: string[];
}

export function CLIRouter({command}: CLIRouterProps) {
    const screens: Record<string, ReactElement> = {
        'auth': <Auth />,
    }

    return screens[command];
}
