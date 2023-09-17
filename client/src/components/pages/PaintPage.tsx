import React from "react";
import { ToolBar } from "../ToolBar/ToolBar";
import { SettingBar } from "../SettingBar/SettingBar";
import { Canvas } from "../Canvas/Canvas";

export function PaintPage() {
    return (
        <>
            <ToolBar/>
            <SettingBar/>
            <Canvas/>
        </>
    );
};
