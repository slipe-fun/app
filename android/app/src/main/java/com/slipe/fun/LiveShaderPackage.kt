package com.slipe.`fun`

import com.facebook.react.ReactPackage
import com.facebook.react.uimanager.ViewManager
import android.app.Application
import android.content.Context
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.slipe.`fun`.LiveShaderViewManager

class LiveShaderPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> = listOf()

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return listOf(LiveShaderViewManager())
    }
}