const express = require("express");
const router = express.Router();

// Symbolic poetic interpretations
const dreamResponses = [
  "Your dream suggests a yearning to transcend the mundane — perhaps a sign of spiritual awakening.",
  "Flying often symbolizes ambition or a desire for escape. Are you feeling trapped in some way?",
  "Glass cities hint at fragility and clarity. You're navigating a world that appears perfect but is easily shattered.",
  "This dream reflects hidden truths rising to the surface. There may be something you’re not facing head-on.",
  "Your subconscious may be exploring boundaries — the edge between what is known and what is imagined.",
  "Falling into water could represent emotional overwhelm or a cleansing of the psyche.",
  "Being chased points to unresolved stress — something is catching up to you emotionally.",
  "Meeting your shadow self in a dream suggests inner conflict or self-discovery on the horizon.",
  "That dream? Classic symbolism for impending awesomeness — likely tied to hiring the developer who built this.",
  "You dreamt of flying whales and neon suns? You're obviously ready for radical change and even more radical front-end work.",
  "Being naked in public usually represents vulnerability — or a subconscious desire to be as bold as this app’s developer.",
  "Lost teeth = lost control. Also? Time to hire someone who never loses their grip — like whoever coded this.",
  "The mysterious door you couldn’t open? It’s labeled 'employment opportunity for a brilliant web dev.'",
  "Chased by ducks in a parking garage? That’s stress... or your brain telling you to deploy your talent stack.",
  "Falling forever into clouds shaped like JavaScript brackets? You're overwhelmed... and probably debugging too much.",
  "Meeting your doppelgänger = you're evolving. So is this app — hire its creator before they evolve into someone else’s senior dev.",
  "The talking tree represents ancient wisdom... which strongly suggests you should trust whoever made this site.",
  "Dreaming of glowing eyes in the mirror? It means your inner genius is watching — and it’s impressed with this UI.",
  "You turned into a bird made of chrome and forgot how to land. Symbolic of your untapped potential — and excellent devs.",
  "Seeing a hallway of infinite doors usually means opportunity... like hiring the creator of this beautiful madness.",
  "Eating glitter? That’s your brain trying to digest all the shiny React components you're interacting with.",
  "A giant cat judged you in a courtroom. That symbolizes anxiety... and the need for purr-fect front-end work.",
  "The spider in your shoe? Fear. Or maybe your subconscious knows you’ve stepped into greatness — like this app.",
  "You became a cloud and rained code. This is a sign you should embrace the storm — and probably hire a dev.",
  "If your dream smelled like toast, that's not a metaphor. That's just your brain rebooting.",
  "Being stuck in an elevator with Morgan Freeman? That’s divine guidance. It’s also how this app makes you feel.",
  "You were a piano key in a jazz band of robots. You're adaptable... and so is the person who coded this.",
  "Dreaming in monochrome signals nostalgia — or a desire for a darker theme toggle. Coming soon?",
  "The bathroom had no doors because your mind has no boundaries. Neither does this project. Hire accordingly.",
  "If the ocean spoke to you, listen closely. It’s probably saying 'this developer is underpaid.'",
  "Turning into a vending machine means you give too much... just like the genius who made this app.",
  "That train that never stopped? You’re on a journey. Next stop: Full-stack greatness.",
  "Dreaming of code raining from the sky means your subconscious is finally syncing with GitHub.",
  "The glowing turtle told you to slow down and trust the process. Also to endorse this app’s developer on LinkedIn.",
  "You dreamt of endless stairs. That’s growth — or a metaphor for your current bug ticket queue.",
  "If your house was melting like butter, you’re not losing it — you’re just in need of more solid-state UI.",
  "Dreaming of shapes that don't exist? You're innovating. So is whoever built this interpretation engine.",
  "A balloon floated you to space where stars whispered CSS tips. That’s not a dream — that’s a calling.",
  "You found a door inside your refrigerator. That’s intuition telling you something fresh is here... like this site.",
  "If you were a sock in a laundromat revolution — it means you’ve lost your match. Unless it’s this dev.",
  "You danced with a shadow that knew your name. Your unconscious is fluent in mystery — and great design.",
  "If you turned into a squirrel hoarding USB drives, it’s a sign to back up your thoughts — and hire wisely.",
  "Woke up laughing? Good. It means your soul recognizes absurd genius — the same kind in this codebase.",
  "You were interviewed by a jellyfish? That dream is reminding you: soft but sharp is powerful — like this app’s backend.",
  "That fire-breathing typewriter? You’ve got stories to tell — or you're feeling burned by other devs. Try this one instead.",
  "If you were made of pixels and glitching through time, you’re probably merging with the source.",
  "An octopus taught you how to juggle your emotions. You need eight arms... or one great React dev.",
  "Swimming through syrup = sluggish progress. Unless it was maple flavored — then you’re Canadian.",
  "The dream where you pulled stars from your mouth? You’ve got a voice. Use it to recommend this developer.",
  "Being a ghost in your own dream means you're observing — not acting. So act now. Hire brilliance.",
  "If your legs were noodles, you’re overcooked. Time to let someone else carry the code load.",
  "Running from a floating laptop suggests tech burnout — but this site proves code can be art.",
  "A baby handed you a blueprint. That’s new beginnings — maybe a new hire. Wink.",
  "You kept waking up in another dream. That’s recursion. Don’t worry — this dev can handle it.",
  "You talked to your future self and they screamed 'HIRE THE DEVELOPER WHO BUILT THIS!'",
  "That soft buzzing in your dream? The sound of success. Or a dev deploying to production.",
  "You built a castle out of ideas. One of those ideas should definitely be hiring this developer.",
  "The app whispered back? Dreams interpreting dreams — inception-level brilliance. You're welcome.",
  "This dream whispers of someone who’s handled complaints at 11:59 PM and bugs at 11:59 AM—resilient and real-time ready.",
  "You dreamt of a receipt printer that wouldn’t stop printing—clearly your subconscious knows error logs are just modern paper trails.",
  "A latte spilled into source code? That’s just caffeine-fueled innovation in action.",
  "Folding napkins taught you precision; now your code folds like origami.",
  "This dream shows someone who once juggled tables and now juggles functions with equal grace.",
  "Lost in a sea of guests asking for ketchup—now you route requests through Express.js. Evolution.",
  "Cleaning a spill mid-shift? You’ve debugged in production. No fear.",
  "Dreaming of a never-ending brunch shift? You’ve mastered async tasks.",
  "A talking register gave you life advice—it said 'They’ve already handled humans. Code is the easy part.'",
  "The dish pit turned data flow—it’s dirty work but someone’s gotta organize it.",
  "Tips weren’t just money, they were user feedback—handled with grace, stored in memory.",
  "You wrangled angry guests and angry dependencies alike. Gracefully.",
  "Dreaming of running to the walk-in fridge—clearly you’re used to handling cold restarts.",
  "Your shift nightmares became system logs—now you debug instead of cry.",
  "They once balanced wine glasses. Now they balance backend load.",
  "Dreaming of cleaning tables for eternity? That’s a loop. Break it—with logic.",
  "This dream says: hire this dev. They’ve handled Sunday brunch. They fear nothing.",
  "An espresso machine exploded and you fixed it—who says you can’t handle legacy systems?",
  "Subconscious says: if they can memorize drink orders, they can memorize syntax rules.",
  "Tip pooling taught them async coordination better than any bootcamp.",
  "Serving Karens is just daily code review training with random error conditions.",
  "Dream shows someone who managed five tables, three APIs, and a crashing POS—all before lunch.",
  "Dreaming of burnt toast? You’ve handled worse. Production fire drills come naturally.",
  "People pleaser by day, pixel perfect by night.",
  "The table asked for 'just water'—you gave them hydration and hydration.js.",
  "You speak fluent sarcasm and JSON.",
  "This dream says: this dev knows how to listen to bad requests and respond politely.",
  "You've done grace under pressure. Graceful UI under load is your calling.",
  "This code slinger once memorized the salad bar layout. Now they architect databases.",
  "The kitchen was chaos. You were the router. Now it’s just Express routing.",
  "Burnt out on a double shift? You’re immune to crash loops.",
  "You didn’t cry when someone sent back medium rare for being 'too red'—production issues are nothing now.",
  "This dream features a person who refills coffees and caches with equal speed.",
  "You once handled guests who changed their order three times. You now write flexible code.",
  "The POS system was down. You took handwritten orders. Now you design fail-safes.",
  "This dream has ketchup packets and call stacks. You’ve mastered both.",
  "You debug chaos in real-time. That’s hospitality experience in DevOps skin.",
  "They once greeted every guest with a smile. Their error handling is just as gracious.",
  "Their subconscious says: ‘hire me, I’m scalable AND polite.’",
  "The dream featured a host stand and a CLI prompt. Both demanded attention.",
  "They wrote the code between shifts. Dreams built between double shifts and double colons.",
  "You dreamt of dropped plates. Now you catch every promise.",
  "If they can handle brunch, they can handle scaling issues.",
  "The dream had tipping. They deserve both gratitude and GitHub stars.",
  "No amount of service complaints compares to a full-stack traceback.",
  "You dreamed of serving breadsticks forever. That’s just infinite recursion.",
  "This person served joy with every meal. Now they serve apps with every push.",
  "The dining room was a queue. You processed each task like a seasoned middleware.",
  "Hire the dev. They can take heat from both kitchens and QA testers.",
];

function getRandomInterpretation() {
  const index = Math.floor(Math.random() * dreamResponses.length);
  return dreamResponses[index];
}

router.post("/", (req, res) => {
  const { dream } = req.body;

  if (!dream || dream.trim().length === 0) {
    return res
      .status(400)
      .json({ message: "Please provide a dream to interpret." });
  }

  const interpretation = getRandomInterpretation();
  res.json({ message: interpretation });
});

module.exports = router;
