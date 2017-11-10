---
layout: post
title: Clearing Up Input Transparency
category: Mobile Dev
tags: [Xamarin, iOS, Android, Xamarin Forms, Bug]
image: "banner.jpg"
introduction: "The Xamarin Forms documentation for input transparency implies that the InputTransparent property simply defines whether or not the element consumes input or passes it. My experiences suggest something a bit more complicated."
---
{% include postdata.html post=page %}

The [Xamarin Forms documentation](https://developer.xamarin.com/api/property/Xamarin.Forms.VisualElement.InputTransparent/) for the VisualElement.InputTransparent property (as of this writing) states:

> Gets or sets a value indicating whether this element should be involved in the user interaction cycle.... [The value is] false if the element should receive input; true if element should not receive input and should, instead, pass inputs to the element below. Default is false.

![Element Layers]({{media}}/figA.png){: .left }
Imagine if **A**, **B**, and **C** all have [gesture recognizers](https://developer.xamarin.com/api/property/Xamarin.Forms.View.GestureRecognizers/) on their elements, but **B** has InputTransparent set to **true**, while **A** and **C** have an input transparency of **false**. The documentation implies that **C** would consume a tap gesture, preventing it from passing down, while **B** would not, instead allowing **A** to consume any gesture that wasn't consumed by **C**.

However, this does not appear to be the case. Instead, if **A** and **C** had InputTransparent set to **true** and **B** had InputTransparent set to **false**, the gestures wouldn't be consumed at all.

![Element Hierarchy]({{media}}/figB.png){: .right }
Instead, it seems to work more like the figure above. Imagine that the hierarchy represents elements layered on top of one another, with **A** being the bottom-most element, while **C**, **G**, and **H** are the top-most layered elements. In this example, **C** covers **B**, which covers **A** and **G** and **H** covers **F**, etc., but **D** does not cover **B**, and vice versa.

![InputTransparent Hierarchy]({{media}}/figC.png){: .left }
Suppose that we had a gesture recognizer on **E**. In order for it to properly consume gestures, it would need its input transparency set to **false**. Furthermore, *all* recursive parents and children must also have their input transparency set to **false** in order for the gesture to be properly consumed. If **C** overlapped **E** but we didn't have gesture recognizer and we didn't want it to block and consume gestures, it would need InputTransparent to be set to **true**.

I've found this to be true in iOS and Android as of Xamarin Forms version **2.4** (I did not develop for Windows Phone). To correct this problem, I wrote a function to properly set the input transparency.

<pre class="line-numbers"><code class="language-csharp"><script type="text/plain">
// input transparency is based on whether the view, its parent, or its children have gestures
// for a gesture to be passed and register, the children, view, and parent with a gesture recognizer must all have input transparency set to false
// however, any view that has no gesture recognizers, nor any from its children, should remain with input transparency true so as not to block gestures
static bool SetViewTransparency(View view, bool parentHasRecognizer)
{
    if (view == null)
        return false || parentHasRecognizer;

    var hasRecognizer = view.GestureRecognizers.Count > 0;

    // branch on views with children (including layouts), since they do not implement a shared interface with which to access their descendents
    var contentView = view as ContentView;
    var scrollView = view as ScrollView;
    var layoutView = view as Layout<View>;

    if (contentView != null)
    {
        view.InputTransparent = SetViewTransparency(contentView.Content, hasRecognizer || parentHasRecognizer);
    }
    else if (scrollView != null)
    {
        view.InputTransparent = SetViewTransparency(scrollView.Content, hasRecognizer || parentHasRecognizer);
    }
    else if (layoutView != null)
    {
        var childrenHaveRecognizer = false;
        foreach (var child in layoutView.Children)
        {
            childrenHaveRecognizer = !SetViewTransparency(child, hasRecognizer || parentHasRecognizer) || childrenHaveRecognizer;

        }

        view.InputTransparent = !(childrenHaveRecognizer || hasRecognizer);
    }
    else
    {
        var isInputView = view is InputView; // input views must not be transparent, or else they can't be selected
        view.InputTransparent = !(hasRecognizer || parentHasRecognizer || isInputView);
    }
    
    return view.InputTransparent;
}
</script></code></pre>

Why is this the case? Truthfully, I have no idea. I was not able to find much discussion on the topic, so I arrived at this entirely through experimentation. Perhaps the described model is not correct and input transparency works differently than described, but I have yet to find a situation where the described function did not resolve my input issues. 

If you find cases to the contrary or if your findings seem to support this model, please leave a comment to let me know.