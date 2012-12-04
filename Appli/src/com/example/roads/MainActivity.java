package com.example.roads;

import android.os.Bundle;
import org.apache.cordova.*;
import android.app.Activity;
import android.view.Menu;

@SuppressWarnings("unused")
public class MainActivity extends DroidGap {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.activity_main, menu);
        return true;
    }
}
