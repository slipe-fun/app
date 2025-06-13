package com.slipe.`fun`

import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.slipe.`fun`.LiveShaderView

class LiveShaderViewManager : SimpleViewManager<LiveShaderView>() {
    override fun getName() = "LiveShaderView"
    override fun createViewInstance(reactContext: ThemedReactContext): LiveShaderView {
        return LiveShaderView(reactContext)
    }
}