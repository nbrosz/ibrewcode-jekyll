---
layout: post
title: Yet Another Test
category: Random
image: "https://theappsolutions.com/images/articles/15/mobile_game_development.jpg"
tags: [Testing, Jekyll, Random, Ipsum, Tag With Spaces]
last_modified_at: "2017-09-20T20:47:31+08:00"
introduction: "Bacon ipsum dolor amet brisket tenderloin sirloin, picanha kevin pork belly salami prosciutto. Cupim flank hamburger, pork loin short ribs sausage venison beef strip steak frankfurter shoulder ground round pork belly jowl leberkas. Cupim shoulder landjaeger chuck brisket t-bone. Shoulder venison pig t-bone drumstick pork loin salami flank frankfurter short loin. Sausage tongue drumstick, ribeye spare ribs beef ribs pork chop. Ribeye pork belly frankfurter capicola hamburger. Turducken sausage filet mignon, t-bone brisket drumstick tri-tip kevin boudin pork."
comments: true
---

Bacon ipsum dolor amet brisket tenderloin sirloin, picanha kevin pork belly salami prosciutto. Cupim flank hamburger, pork loin short ribs sausage venison beef strip steak frankfurter shoulder ground round pork belly jowl leberkas. Cupim shoulder landjaeger chuck brisket t-bone. `jekyll serve` Shoulder venison pig t-bone drumstick pork loin salami flank frankfurter short loin. Sausage tongue drumstick, ribeye spare ribs beef ribs pork chop. Ribeye pork belly frankfurter capicola hamburger. `var test = ["new test"];` Turducken sausage filet mignon, t-bone brisket drumstick tri-tip kevin boudin pork.

<!--excerpt-->

> A wise man once said, "A wise man once said, "A wise man once said, "A wise man once said."""

Burgdoggen prosciutto bresaola capicola turkey kevin ham hock pork loin. Filet mignon pancetta shankle pig bacon ham short ribs ground round kielbasa picanha porchetta boudin. Short loin landjaeger turkey beef filet mignon brisket pork, tenderloin kielbasa ribeye. Picanha bresaola doner pastrami, ribeye cupim capicola drumstick rump tri-tip. Burgdoggen tongue alcatra pork swine shank pancetta. Pig kielbasa swine corned beef filet mignon pancetta landjaeger ground round venison jowl andouille spare ribs cow sirloin. Pig burgdoggen ball tip sirloin, doner shank pork belly swine short loin tail.

Spare ribs ham short loin tenderloin turkey, leberkas frankfurter. Beef ribs pork sirloin flank drumstick, porchetta meatball meatloaf rump. Ground round spare ribs kevin pastrami meatball. Burgdoggen sirloin tongue meatloaf kevin short ribs chicken pancetta picanha tenderloin swine andouille bacon ball tip kielbasa. Frankfurter pastrami filet mignon tongue.

<div class="limited-block" markdown="1">

``` cs
using System.Collections;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using UnityEngine;

public class BillboardAnimator : MonoBehaviour {

    public new Renderer renderer;
    public Texture[] frames;
    public string[] animations;
    public string startAnimation = null;

    private Dictionary<string, int[]> animationSheets;
    private string currentAnimation = null;

    private float frameLength;
    private int frameCounter = 0;
    private float frameTimer = 0;

    private Queue<string> animationQueue;

    void Awake() {
        animationQueue = new Queue<string>();
        animationSheets = new Dictionary<string, int[]>();
        // convert all animation strings to lists of frames with an identifying name
        foreach(var animationText in animations) {
            var animationName = Regex.Match(animationText, @"[A-z]+").Value;
            var animationFrameString = Regex.Match(animationText, @"(\d+,?)+").Value;
            var animFrameStrings = animationFrameString.Split(',');
            var frameList = new List<int>();

            foreach(var frameString in animFrameStrings) {
                frameList.Add(int.Parse(frameString));
            }

            animationSheets.Add(animationName, frameList.ToArray());
        }

        if (startAnimation != null && startAnimation != "") {
            PlayAnimation(startAnimation); // play starting animation, if specified
        }
    }

    /// <summary>Start playing an animation with the specified name</summary>
    public void PlayAnimation(string animationName, bool clearQueue = false) {
        if (clearQueue)
            animationQueue.Clear();

        if (currentAnimation == animationName)
            return; // don't bother if already playing

        currentAnimation = animationName;
        var frameArray = animationSheets[animationName];
        // last entry holds FPS
        frameLength = 1f / frameArray[frameArray.Length-1];
        frameTimer = 0;
        frameCounter = 0;
        SetAnimationFrame(frameArray[frameCounter]);
    }

    /// <summary>Queue an animation to play</summary>
    public void QueueAnimation(string animationName) {
        animationQueue.Enqueue(animationName);
    }

    /// <summary>Push current animation to the queue and immediately play this one</summary>
    public void QuickPlayAnimation(string animationName) {
        if (currentAnimation != null) {
            var currentQueue = animationQueue.ToArray();
            animationQueue.Clear();
            // push current animation to front
            animationQueue.Enqueue(currentAnimation);
            // then everything else
            foreach (var animation in currentQueue)
                animationQueue.Enqueue(animation);
        }

        // finally play new animation
        PlayAnimation(animationName);
    }

    public bool PlayingOrUpNext(string animationName) {
        return currentAnimation == animationName || (animationQueue.Count > 0 && animationQueue.Peek() == animationName);
    }

	void Update () {
		if (currentAnimation != null) {
            frameTimer += Time.deltaTime;
            if (frameTimer >= frameLength) {
                frameTimer = 0;
                var frameArray = animationSheets[currentAnimation];
                frameCounter = (frameCounter + 1) % (frameArray.Length - 1); // -1 because last value is the FPS
                SetAnimationFrame(frameArray[frameCounter]);

                if (frameCounter == 0 && animationQueue.Count > 0) {
                    // play and remove next in queue
                    PlayAnimation(animationQueue.Dequeue());
                }
            }
        }
	}

    void SetAnimationFrame(int index) {
        renderer.material.mainTexture = frames[index];
    }
}
```

</div>

Shoulder strip steak ribeye, ball tip kevin biltong sirloin frankfurter pancetta meatball tri-tip filet mignon. Boudin biltong pastrami filet mignon chicken meatloaf venison, turducken brisket strip steak. Meatball fatback pancetta porchetta shoulder boudin hamburger alcatra ground round picanha, meatloaf burgdoggen chicken bresaola chuck. Drumstick strip steak t-bone prosciutto burgdoggen fatback landjaeger andouille leberkas porchetta pork meatloaf ham alcatra tail. Ball tip filet mignon pig meatloaf meatball ground round. Jowl turducken capicola boudin, shankle pork chop spare ribs cupim ribeye ball tip tongue tenderloin prosciutto. Meatball pig sausage spare ribs.

Capicola tri-tip short ribs landjaeger drumstick, alcatra strip steak pork loin beef ribs ribeye biltong tenderloin. Landjaeger ball tip pork chop jerky leberkas brisket. Jerky beef ribs venison ball tip biltong, bacon drumstick ham. Flank capicola shankle turkey sirloin ham pork belly turducken pastrami chuck sausage short ribs beef ribs. Pork loin sirloin sausage shoulder alcatra, pastrami ham hock pork beef turducken. Drumstick biltong capicola filet mignon, shoulder tail turkey pastrami andouille kielbasa corned beef tongue hamburger turducken porchetta.