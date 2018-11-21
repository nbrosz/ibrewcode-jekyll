---
layout: post
title: Getting a Taste of VanillaJS
category: Web Dev
tags: []
image: "banner.jpg"
introduction: "After years of relying on jQuery, all while reading articles about how jQuery is dead, I decided to go vanilla."
---
{% include postdata.html post=page %}

Thanks to helpful sources like [You Might not Need jQuery](http://youmightnotneedjquery.com/) and [Can I Use...](https://caniuse.com/), finding alternatives to common jQuery functions is easy, and I was very impressed with the simplicity that the modern *querySelector(selector)* and *querySelectorAll(selector)* offer. I'm sure that I'm not in the minority with *querySelector*, *matches*, and *closest* becoming my bread and butter, and although the XMLHttpRequest object is not the prettiest construct, but at least there is [plenty of documentation](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest), and once I created a helper function to speed things along, I didn't have much issue.

The bigger difficulty was finding a front-end (CSS) framework. Up to now, [Bootstrap](https://getbootstrap.com/) had been my go-to, and even though it has been around for a long time, I still think it has a visually appealing style that has endured the test of time much better than other approaches to a "modern web" look (does anyone remember Web 2.0?). The problem is that it seems like [most of the best front-end frameworks rely on jQuery](https://www.keycdn.com/blog/front-end-frameworks) (or they are more of a [minimal framework](https://www.hongkiat.com/blog/bootstrap-alternatives/) like [Skeleton](http://getskeleton.com)). In the end, I settled on [Bulma](https://bulma.io/) as a non-jQuery CSS-only front-end library, and so far, I've enjoyed both its Bootstrap-like modern look and the simple way it handles styling with intuitive modifiers.

![Bulma Columns and Buttons]({{media}}bulma-buttons.png)

<pre class="line-numbers"><code class="language-markup"><!--
<div class="columns"> 
    <div class="column"> 
        <div class="button is-primary is-fullwidth">First Button</div> 
    </div> 
    <div class="column"> 
        <div class="button is-rounded is-medium is-warning is-pulled-right">Second Button</div> 
    </div> 
    <div class="column"> 
        <div class="button is-outlined is-large is-danger">Third Button</div> 
    </div> 
</div>
--></code></pre>

## The Catch
Everything probably would have been fine, if not for the necessity of supporting Internet Explorer 11. You Might Not Need jQuery does a great job of offering alternative solutions to get around IE 11's many missing features, but those alternate solutions almost certainly **will** be necessary. I was under the impression that IE9 and below was where the problems really started, and they probably are much worse when you're targeting that level of support, but the lack of things like Promises or JSON support for XMLHttpRequest means that third party libraries are almost certainly going to be necessary (I found that [BluebirdJS Core](http://bluebirdjs.com) did an excellent job of providing drop-in support for Promises). I also had to make various tweaks hacky CSS tweaks for Bulma's modals to work, since IE11 doesn't fully support flexboxes.

Wasn't the whole point of going vanilla to get away from dependencies on third-party JavaScript libraries in the first place? Granted, if you're clever with which libraries you pull in ([$dom](https://github.com/julienw/dollardom) and [bonzo](https://github.com/ded/bonzo) look promising), you may be able to minimize the size of what you're pulling in, but will it really be [that much less](https://mathiasbynens.be/demo/jquery-size) than just pulling in jQuery to begin with and having most of that functionality in one package out of the box? With [how many sites use jQuery](https://remysharp.com/2017/12/15/is-jquery-still-relevant#javascript-library-distribution), the client may well already have it cached if you reference through a common CDN (or right from [code.jquery.com](https://code.jquery.com/)), and even if not, the full minified library isn't much more than your typical header image.

On top of that, keeping jQuery around opens a lot of options for existing scripts, front-end frameworks, plugins, etc., and the more common mini-features I can avoid coding and testing from scratch, the better.

## Conclusion
Do I think it's viable to go vanilla? Sure, and I personally enjoyed doing so, **but** if your goal is to get the greatest productivity for your time with minimal trouble, I'd still recommend jQuery. The ability to avoid wasting time tracking down third-party polyfills alone is a great benefit, but considering how many doors are opened by jQuery for front-end frameworks and ready-to-go plugins, I think jQuery absolutely has a place in the modern development space, and I can see myself returning to jQuery + Bootstrap as my go-to front-end stack for anything more than a small or personal project.

Maybe in another three or four years the remaining IE11 usage will dry up and developers can finally stick to browsers that follow the W3C standards and support CSS features like flexbox, but until then, I think that there is certainly value to just sticking with what works out of the box (jQuery). And despite what some articles may claim, there's no shame in a practical focus toward getting valuable work done as quickly and efficiently as possible.

With all that said, **if you don't need jQuery, don't use it**. Convenient access to ready-made front-end frameworks and plugins and handy short-hand syntax for reducing otherwise enormous JavaScript files is one thing, but being unable to work with the DOM without jQuery is another, and JavaScript wrapper libraries like jQuery can come at a significant performance cost, a particularly important point for large sites or mobile web apps. I learned how to go [vanilla](http://vanilla-js.com/), and [you can, too](https://blog.garstasio.com/you-dont-need-jquery/why-not/).
