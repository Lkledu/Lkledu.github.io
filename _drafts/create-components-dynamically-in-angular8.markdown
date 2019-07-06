---
layout: post
title:
author: Eduardo
tag: blog
date: 2019-06-22 20:40:00
---

These days I've a problem to instantiate a component dynamically in Angular 8.

After a long research I discover what i came share here.

In angular, to instantiate a html component we need of two references. One for the local were the component will be rendered and another for the component. For the reference of the locale, we can create a directive, or we can use a variable in html's tag:

&lt;div \#variable&gt;&lt;/div&gt;

After create the variable, we use the decorator ViewChild in our class component:

@ViewChild(variable) referenceOfDiv;

The argument is the selector to refer to the HTML div.

OBS: the viewChild only happens in ngAfterViewInit(), what means, if you use it in ngOnInit() any component will render because the referenceOfDiv variable will return Undefined, because the viewChild doesn't was executed yet.

After create the reference we need to inform to angular what type of component we'll create in this location.

we can create this with a ComponentFactory who will receive a component type (the class of the component) and by the selector and background of angular, will get the template&nbsp; of this component.

constructor(resolver ComponentFactory)

const factory = new resolver.resolveComponentFactory(ComponentClass);

Before create the component, is prudent to clear the container, to remove any other object who can be created inside there

this.referenceOfDiv.ViewContainerRef.clear();

After clean the container, we only have to create the component passing the type desired.

const componentDynamic = viewContainerRef.createComponent(componentFactory);

After created, we can access the component by createComponent().instance

componentDynamic.instance.attribute = value;