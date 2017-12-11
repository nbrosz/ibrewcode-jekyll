---
layout: post
title: Components and Messages in Unity
category: Game Dev
tags: [Unity, Learning]
image: "banner.jpg"
introduction: "Message passing seems a natural fit for a component based architecture, but I'm not satisfied with Unity's built in messaging system, so I tried to make my own."
---
{% include postdata.html post=page %}

Up to now, I have had a tendency toward monolithic classes when developing in Unity. My experience has always been with the typical object-oriented approach (with the exception of when I was developing using [batari Basic](http://www.randomterrain.com/atari-2600-memories-batari-basic-commands.html)), but I've been trying to train myself toward small, reusable components with focused purposes. I've had some good success lately, breaking larger scripts into smaller ones and using interfaces as a means of communicating between components where possible.
<pre class="line-numbers"><code class="language-csharp">{% capture code %}
public class ReportAttack : MonoBehaviour, IDamageable {
    public Team team;
    void Start () {
		team = GetComponent<Team>();
	}

    void IDamageable.TakeDamage(MonoBehaviour from, DamageType type, float amount)
    {
		var attackerTeam = from.GetComponent<Team>();
		if (team && attackerTeam && team.team != attackerTeam.team)
			Debug.Log(gameObject.name + " says: I've Been Attacked by " + from.gameObject + " on team " + (attackerTeam ? attackerTeam.team.ToString() : "no team") + " with " + System.Enum.GetName(typeof(DamageType), (DamageType)((int)type << 1)) + " (" + (int)type + ")");
    }
}
{% endcapture %}{{ code | lstrip | rstrip | xml_escape }}</code></pre>
While I've been fairly satisfied with the use of interfaces for calls to multiple or unknown components, I recall fondly the rapid development and flexible approach provided by utilizing messages in my 2017 Global Game Jam submission, [Metalmancer](https://globalgamejam.org/2017/games/metalmancer).
<pre data-src="https://reflect.ibrewcode.com/?target=https://raw.githubusercontent.com/nbrosz/gamejam-17/master/Audiomancer/Assets/Scripts/Attack.cs" class="line-numbers language-csharp"></pre>
However, since Unity's message passing uses reflection (or at least **probably** does, given that it takes the string name of the event to call), it does not perform particularly well. With that in mind, I hoped to make my own, alternative messaging system which is used much like the existing messaging system, but uses delegates and event handlers under the hood. [This was the result](https://gist.github.com/nbrosz/a0544d3196765d739f5729bffe6e5b18).
<pre data-src="https://reflect.ibrewcode.com/?target=https://gist.githubusercontent.com/nbrosz/a0544d3196765d739f5729bffe6e5b18/raw/8b4b5d762e3197b46a6dc6c4a8108719a660846d/MessagingBehavior.cs" class="line-numbers language-csharp"></pre>
While I felt that I succeeded in my goal of providing a useful interface that hid the reflection-based old messaging system, I was crestfallen once I began running tests.
![Performance Testing]({{media}}figA.png){: .left }
On average, I see a performance increase of about 33% over Unity's built in SendMessage, with the complication that all components using the new system must inherit from the new MessagingBehavior abstract class, rather than directly from MonoBehavior. Still, given that a direct call (as would be the case using an interface) is still about ten times faster, I wasn't particularly encouraged by these results.

On the other hand, as **tomvds** [said in the Unity forums](https://forum.unity.com/threads/is-sendmessage-really-that-bad.38094/#post-245212):
> Optimization is not about avoiding expensive code. It's about avoiding expensive code where it matters.

![Performance Testing]({{media}}figB.png){: .right }
Still, stubborn as I am, it'll be hard to convince myself to use even my own message passing architecture in lieu of more efficient interfaces. Or maybe I should just use an adaptation of **wmiller**'s [Events system](https://gist.github.com/wmiller/3903205#file-events-cs).
Or I should just stop worrying about it.