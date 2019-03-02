FluentRevealEffect.applyEffect(".ui-btn", {
	lightColor: "rgba(255,255,255,0.2)",
    gradientSize: 75,
    clickEffect: true
})

FluentRevealEffect.applyEffect("#newtabbutton", {
	lightColor: "rgba(255,255,255,0.2)",
    gradientSize: 25,
    clickEffect: true
})

FluentRevealEffect.applyEffect(".ubarnavbtn", {
	lightColor: "rgba(255,255,255,0.4)",
    gradientSize: 35,
    clickEffect: true
})

FluentRevealEffect.applyEffect(".menuitem", {
	lightColor: "rgba(255,255,255,0.2)",
    gradientSize: 180,
    clickEffect: true
})

FluentRevealEffect.applyEffect("#urlbar", {
	lightColor: "rgba(255,255,255,0.2)",
    gradientSize: 250,
    // clickEffect: true
})


// FluentRevealEffect.applyEffect(".tab", {
// 	clickEffect: true
// })

FluentRevealEffect.applyEffect(".tab", {
    clickEffect: true,
    lightColor: "rgba(255,255,255,0.6)",
    gradientSize: 80,
    isContainer: true,
    children: {
        borderSelector: ".tabtext",
        elementSelector: ".tab",
        lightColor: "rgba(255,255,255,0.3)",
        gradientSize: 150
    }
})
