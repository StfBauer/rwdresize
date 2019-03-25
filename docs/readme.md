# Identify the context of the web part zone through CSS

The following screenshot shows the same web part in different containers. The color coding comes from the CSS attached to the web part indentifies the parent context.

## Desktop
![image](https://github.com/StfBauer/rwdresize/blob/master/docs/desktop-same-webpart-on-page.png "Same web part on page")

## Tablet
![image](https://github.com/StfBauer/rwdresize/blob/master/docs/tablet-same-webpart-on-page.png "Same web part on page")

## Mobile
![image](https://github.com/StfBauer/rwdresize/blob/master/docs/mobile-same-webpart-on-page.png "Same web part on page")

# How it works

The web part code use the following mixin.

```sass
@mixin optimizeWebpart($gridcolumns) {
  // Set the CSS Module scope to global
  :global {
    // inject column setup here e.g. .CanvasSection-xl12
    #{$gridcolumns} {
      // switch again the scope to local for the web part
      // ⚠️☠️ DO NOT ADD ANY OTHER STYLE IN HERE ☠️⚠️
      :local {
        // include content of mixin in here
        @content
      }
    }
  }
}
```

The call for the zone specific CSS looks like this:

```sass
//Canvas Section CanvasSection-xl12
@include optimizeWebpart(".CanvasSection-xl12") {
  .rwdResize {
    color: white;
    background-color: $red;
  }
}
```

When the web part is located in a `.CanvasSection-xl12`the default CSS will be overwritten with ```color: white``` and ```background-color: $red```.

The resulting css looks like this:

```css
.CanvasSection-xl12 .rwdResize_f25c25ac {
  color: #fff;
  background-color: #dd314d
}
```

This method allows you to specify context dependend override and user experience. Another option is also to include the design of tablet or phone when it is suitable for this specific section through the using SASS mixins.

# Example with mixin

```sass

@mixin cardxyz-mobile {
  font-weight: bold;

  display: flex;

  box-sizing: border-box;
  height: 10vh;
  padding: 1vh;

  align-content: center;
  align-items: center;
  justify-content: center;
  align-self: center;
}

@media screen and (max-width: 480px) {
  .cardxyz {
    @include cardxyz-mobile;
  }
}

// Canvas Section CanvasSection-xl6
@include optimizeWebpart(".CanvasSection-xl4") {
  .cardxyz {
    @include cardxyz-mobile;

    color: black;
    background-color: $yellow;
  }
}

```

The resulting CSS:

```css
@media screen and (max-width:480px) {
  .cardxyz_2bedc9a8 {
    font-weight: 700;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 10vh;
    padding: 1vh;
    -ms-flex-line-pack: center;
    align-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-item-align: center;
    align-self: center
  }
}

.CanvasSection-xl4 .cardxyz_2bedc9a8 {
  font-weight: 700;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 10vh;
  padding: 1vh;
  -ms-flex-line-pack: center;
  align-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-item-align: center;
  align-self: center;
  color: #000;
  background-color: #eeb405
}

```
