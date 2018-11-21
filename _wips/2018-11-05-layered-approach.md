---
layout: post
title: A Layered Approach to Web App Architecture
category: Web Dev
tags: [.Net Core]
image: "banner.jpg"
introduction: "A layered architecture keeps code reusable, testable, and upgradeable, but what does it look like in practice?"
series: dotnet-core-from-the-ground-up
slug: layered-approach
---
{% include postdata.html post=page %}

Architecture matters, and the sooner it can be put right, the better. I've worked with several .Net Web Forms, .Net MVC, and .Net Core web apps, and they all have something in common: inconsistant architecture. Maybe there was tight coupling between the front and back ends, or too much business logic in the controller actions, or a single set of models that forced the front-end and back-end to share all requirements (I won't be making that mistake again), but they all suffered from growing pains as requirements changed, or business rules became more complicated, or unit tests began to be implemented. That's exactly what a well-designed layered architecture is intended to alleviate.

I've read many articles about layered architecture, writing testable code, and keeping a separation of concerns, but I haven't found very many that tie it all together with full-stack .Net Core. In this series, I will define some recommended practices of how to create a well-defined layered architecture, provide code examples, share some pitfalls I've found, and speculate on some of my own questions and areas for improvement. It should be noted that there are many different interpretations of layered architectures, but I'll be using a Persistance-Business-Presentation layer stack.

As I discover more about architectural designs and their recommended practices, I'll be returning to update articles with changes, so don't hesitate to leave constructive criticism or new ideas.

## Web Apps are Like Onions
*Because many of them stink, and that makes me cry.*

There are three essential layers: **Persistance**, **Business**, and **Presentation**. Moving from bottom to top, we have:

1. Persistance Layer
   * Provides access to some stored state, usually a database.
   * Contains [repositories](https://www.codeproject.com/articles/526874/repositorypluspattern-cplusdoneplusright) that encapsulate access to the data store.
2. Business Layer
   * Provides rules for how the app's data is retrieved, manipulated, and stored.
   * Contains services that encapsulate business rules and access to repositories.
3. Presentation Layer
   * Provides a means of viewing existing data and inputting new data.
   * Contains controllers that encapsulate request rules and access to services.

Notice that this stack could work just as well for a headless API as it could as the back-end for a web app. That's because, despite the misleading name of the **Presentation** layer, the stack should be agnostic to what particular technologies are being used. Whether it's Entity Framework, ADO.Net, or something else entirely as your data store, it doesn't really matter so long as it comes wrapped in a repository. Got AngularJS, React, KnockoutJS, or even vanilla JavaScript in your front-end? They can all consume the same API endpoints (or if a templated approach like Razor views are used, at least the same services). All that matters is that code is abstracted and testable.

Note that while the use of abstraction through interfaces *does* allow the convenience of swapping out whole layers, such as one ADO.Net repository implementation for some Entity Framework Core-based implementation, the purpose of abstraction through interfaces is more to provide the ability to [mock objects](https://www.c-sharpcorner.com/UploadFile/dacca2/fundamental-of-unit-testing-understand-mock-object-in-unit/) during unit testing. It's not very likely that anyone is going to swap out the business layer, for instance, but there's still benefit to sticking with abstraction through interfaces to make focused unit testing possible.

