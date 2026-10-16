import { ClusterInfo } from "@/types/cluster";

export const CLUSTERS: ClusterInfo[] = [
  {
    id: 0,
    name: "Mixed / General News",
    category: "General",
    articleCount: 71,
    datasetPercentage: 0.06,
    topTerms: ["ap", "ap ap", "said", "bush", "new", "night", "two", "friday", "sunday", "game"],
    description: "Catch-all cluster capturing concise wire dispatches and mixed-topic Associated Press summaries.",
    interpretation: "Characterized by high frequency of AP wire datelines and general reporting vocabulary spanning politics, regional events, and games.",
    pcaX: 0.1336,
    pcaY: 0.1911,
    samples: [
      "Red-Footed Falcon Sighted in Mass. (AP) AP - A red-footed falcon spotted for the first time in North America is enticing birdwatchers to Martha's Vineyard.",
      "Rockies Pitcher Frets Health, Not Baseball (AP) AP - The blood clots that went from Aaron Cook's shoulder to his lungs might threaten his career.",
      "Cards' Eldred Likes Relief Pitching Role (AP) AP - Over time, Cal Eldred has learned to embrace the bullpen."
    ]
  },
  {
    id: 1,
    name: "Iraq Conflict / Violence",
    category: "World",
    articleCount: 1346,
    datasetPercentage: 1.12,
    topTerms: ["iraq", "killed", "baghdad", "iraqi", "people", "said", "least", "police", "two", "us"],
    description: "Military operations, security incidents, casualties, and coalition developments in Iraq.",
    interpretation: "Distinctly focused on the post-2003 Iraq conflict, localized security reporting in Baghdad and Najaf, insurgent actions, and military casualty figures.",
    pcaX: 0.0151,
    pcaY: 0.0546,
    samples: [
      "Delegates Urge Al-Sadr to Leave Shrine BAGHDAD, Iraq - Delegates at Iraq's National Conference called Monday for radical Shiite cleric Muqtada al-Sadr to abandon his uprising against U.S. and Iraqi troops and pull his fighters out of a holy shrine in Najaf...",
      "Mortar Attack in Central Baghdad Kills 5 BAGHDAD, Iraq - Insurgents fired a mortar on a busy street in central Baghdad on Tuesday, killing five people and wounding 30, the Interior Ministry and hospital officials said.",
      "Baghdad Blast Kills Seven, Najaf Fighting Rages BAGHDAD (Reuters) - A shell killed seven people in a busy Baghdad street on Tuesday and U.S. forces fought pitched battles with Shi'ite militia in the holy city of Najaf."
    ]
  },
  {
    id: 2,
    name: "International / General Reuters News",
    category: "World",
    articleCount: 180,
    datasetPercentage: 0.15,
    topTerms: ["reuters", "reuters reuters", "said", "tuesday", "wednesday", "thursday", "friday", "monday", "dollar", "inc"],
    description: "International wire dispatches, diplomatic notes, and global marketplace updates from Reuters.",
    interpretation: "Defined by Reuters wire formatting, weekday temporal markers, global currency mentions, and international diplomatic developments.",
    pcaX: -0.0797,
    pcaY: -0.0234,
    samples: [
      "Wall St. Bears Claw Back Into the Black (Reuters) Reuters - Short-sellers, Wall Street's dwindling band of ultra-cynics, are seeing green again.",
      "Dolphins Too Have Born Socialites (Reuters) Reuters - Some people are born to be the life and soul of the party -- and so it seems are some dolphins.",
      "What's in a Name? Well, Matt Is Sexier Than Paul (Reuters) Reuters - As Shakespeare said, a rose by any other name would smell as sweet. Right?"
    ]
  },
  {
    id: 3,
    name: "Technology / Software",
    category: "Technology",
    articleCount: 6226,
    datasetPercentage: 5.19,
    topTerms: ["microsoft", "software", "internet", "new", "service", "ibm", "web", "music", "security", "computer"],
    description: "Software industry updates, enterprise computing, cyber security, digital music, and internet services.",
    interpretation: "Clusters articles focusing on major tech giants (Microsoft, IBM, Apple), operating systems, enterprise software, cybersecurity vulnerabilities, and internet innovations.",
    pcaX: -0.0014,
    pcaY: 0.0618,
    samples: [
      "Researchers seek to untangle the e-mail thread - E-mail is a victim of its own success. That's the conclusion of IBM Corp. researchers in Cambridge, who have spent nearly a decade conducting field tests at IBM and other companies about how employees work and use electronic mail.",
      "BEA grabs CA exec to head product group - BEA Systems Inc. has hired the Computer Associates International Inc. executive responsible for CA's Unicenter line of enterprise management software to head BEA's product development group.",
      "Dutch Firm Beats Apple to Punch - A music retailer from the Netherlands beats Apple by launching a download service in Europe's latest market battleground. Also: Movie industry wrests agreement from defunct company... Microsoft challenges Photoshop."
    ]
  },
  {
    id: 4,
    name: "Lifestyle / Consumer News",
    category: "Lifestyle",
    articleCount: 144,
    datasetPercentage: 0.12,
    topTerms: ["quot", "said", "us", "new", "quot quot", "quot said", "says", "yesterday", "one", "would"],
    description: "Feature columns, cultural commentary, consumer interest pieces, and conversational journalism.",
    interpretation: "Contains long-form interview quotes, opinion columns, cultural musings, and consumer feature writing with conversational vocabulary.",
    pcaX: 0.0836,
    pcaY: 0.2083,
    samples: [
      "Bill Simmons - I'm starting to wonder if 'Puerto Rico 92, USA 73' was one of those life-altering upsets, along the lines of 'USA 4, USSR 3' and 'Cadwallader 99, Nevada State 98.' It's not that we lost. I knew that was going to happen.",
      "The 'i' in 'Internet' - It's not exactly an earth-shaking development but I expect that Wired News' very public announcement that it would no longer capitalize 'Internet', 'Web' or 'Net' will provoke discussion.",
      "They built it, but no one comes - 'It's sad,' the British visitor to Athens said, shaking her head. 'It's sad that nobody is here, buying tickets to the Olympics. People should be out there telling people that Athens is great.'"
    ]
  },
  {
    id: 5,
    name: "Web / Markup & IT Noise",
    category: "Technology",
    articleCount: 3280,
    datasetPercentage: 2.73,
    topTerms: ["lt", "gt", "lt gt", "gt lt", "fullquote", "reuters", "http", "href", "lt href", "href http"],
    description: "Syndicated tech columns, HTML entity tokens, and automated web news feeds.",
    interpretation: "Artifact cluster formed from web scraped RSS feeds and HTML entity encoding (&lt;, &gt;, href links) typical in online tech publication syndication.",
    pcaX: -0.1146,
    pcaY: 0.1954,
    samples: [
      "HP: The Adaptive Enterprise that can't adapt <strong>Opinion</strong> SAP hardly to blame",
      "Buffy the Censor Slayer <strong>Letters</strong> Readers drive stake through parents' group",
      "Ashlee Vance: the readers have spoken <strong>Poll results</strong> Bright news for resident Reg ladyboy"
    ]
  },
  {
    id: 6,
    name: "Oil / Energy Markets",
    category: "Energy",
    articleCount: 983,
    datasetPercentage: 0.82,
    topTerms: ["oil", "prices", "oil prices", "crude", "stocks", "barrel", "crude oil", "record", "reuters", "high"],
    description: "Crude oil trading, OPEC benchmarks, barrel pricing records, and global energy supply fluctuations.",
    interpretation: "Extremely tight semantic cluster centered entirely on energy commodity markets, crude pricing spikes, barrel records, and geopolitical impact on energy supplies.",
    pcaX: -0.4815,
    pcaY: -0.3434,
    samples: [
      "Oil Prices Hit Record (Reuters) - Oil prices jumped to a new record high near $47 on Monday with traders on tenterhooks for the result of Venezuela's weekend referendum and Iraq's exports again disrupted by a Shi'ite uprising.",
      "Oil Prices Hold Near Record - LONDON (Reuters) - Oil prices simmered near fresh highs Monday even though early reports of victory for Venezuelan President Hugo Chavez in a referendum on his rule eased fears that unrest could upset exports.",
      "Oil Holds Near Record Level - Oil prices fell 23 cents to $46.35 a barrel after Venezuelan Hugo Chavez won a recall referendum, appeasing worried energy markets."
    ]
  },
  {
    id: 7,
    name: "Olympics / International Sports Events",
    category: "Sports",
    articleCount: 346,
    datasetPercentage: 0.29,
    topTerms: ["gold", "olympic", "athens", "medal", "gold medal", "olympics", "games", "greece", "men", "women"],
    description: "Olympic Games competitions, medal standings, swimming finals, track events, and athlete achievements.",
    interpretation: "Strongly cohesive cluster covering the 2004 Athens Summer Olympics, gold medal performances (such as Michael Phelps), and national squad tournaments.",
    pcaX: 0.4444,
    pcaY: -0.4220,
    samples: [
      "Tough Race Ahead for Swimmer Phelps - ATHENS (Reuters) - Michael Phelps, his first gold medal safely gathered in, eased through the next phase of his monumental Olympic challenge in the heats of the 200 meters freestyle Sunday.",
      "U.S. Softball Team Puts Australia in Its Place - ATHENS (Reuters) - The United States kept itself firmly on course for a third straight Olympic softball gold medal when it thrashed Australia 10-0 Sunday.",
      "South Africa Ends Phelps Medal Quest - ATHENS (Reuters) - South Africa ruined Michael Phelps's dream of winning a record eight gold medals at the Athens Olympics with a stunning victory in the men's 4x100 meters freestyle final."
    ]
  },
  {
    id: 8,
    name: "General Sports",
    category: "Sports",
    articleCount: 5957,
    datasetPercentage: 4.96,
    topTerms: ["season", "game", "win", "team", "first", "one", "cup", "night", "league", "victory"],
    description: "Major sports leagues including baseball (MLB), soccer, basketball (NBA), gridiron football, and league standings.",
    interpretation: "Broad sports coverage analyzing regular season matchups, playoff races, team victories, home runs, and tournament championship runs.",
    pcaX: 0.0784,
    pcaY: 0.0077,
    samples: [
      "GameBoy mini-games win prize - A set of GameBoy micro-games is named as the most innovative game of the year at a festival in Scotland.",
      "Reds Knock Padres Out of Wild-Card Lead (AP) - Wily Mo Pena homered twice and drove in four runs, helping the Cincinnati Reds beat the San Diego Padres 11-5 on Saturday night.",
      "Indians Beat Twins 7-1, Nearing AL Lead (AP) - The Cleveland Indians pulled within one game of the AL Central lead, scoring four runs in the first inning and beating the Minnesota Twins 7-1 Saturday night."
    ]
  },
  {
    id: 9,
    name: "New York / Local News",
    category: "Local",
    articleCount: 592,
    datasetPercentage: 0.49,
    topTerms: ["new", "york", "new york", "york reuters", "yankees", "reuters", "report", "time", "tuesday", "york yankees"],
    description: "Metropolitan news, New York Yankees coverage, Wall Street district dispatches, and regional municipal updates.",
    interpretation: "Geographically clustered articles tied to New York City institutions, Wall Street district events, and NY sports franchises.",
    pcaX: -0.0461,
    pcaY: 0.0248,
    samples: [
      "IT alligator tales - I grew up in New York, where giant alligators -- sometimes more ornately described as albino alligators -- were rumored to roam the citys sewer systems.",
      "AL Wrap: Olerud Cheers Yankees by Sinking Ex-Team - NEW YORK (Reuters) - John Olerud sunk his former team by recording a two-run single in the eighth inning to drive in the go-ahead runs which earned the New York Yankees a 6-4 win.",
      "Art Looks Like Fine Investment for Funds - NEW YORK (Reuters) - Some mutual funds invest in stocks; others invest in bonds. Now a new breed of funds is offering the chance to own fine art."
    ]
  },
  {
    id: 10,
    name: "Business / Corporate Finance",
    category: "Business",
    articleCount: 7532,
    datasetPercentage: 6.28,
    topTerms: ["company", "million", "said", "inc", "billion", "us", "percent", "corp", "quarter", "profit"],
    description: "Corporate earnings reports, quarterly revenues, IPO filings, mergers & acquisitions, and shareholder returns.",
    interpretation: "Heavily financial cluster focusing on corporate revenue metrics, quarterly earnings calls, valuation benchmarks, and SEC filings.",
    pcaX: -0.0434,
    pcaY: 0.0171,
    samples: [
      "Money Funds Fell in Latest Week (AP) - Assets of the nation's retail money market mutual funds fell by $1.17 billion in the latest week to $849.98 trillion, the Investment Company Institute said Thursday.",
      "Google IPO Auction Off to Rocky Start - WASHINGTON/NEW YORK (Reuters) - The auction for Google Inc.'s highly anticipated initial public offering got off to a rocky start on Friday after the Web search company sidestepped a bullet from U.S. securities regulators.",
      "HP shares tumble on profit news - Hewlett-Packard shares fall after disappointing third-quarter profits, while the firm warns the final quarter will also fall short of expectations."
    ]
  },
  {
    id: 11,
    name: "Politics / Government / International Affairs",
    category: "Politics",
    articleCount: 93343,
    datasetPercentage: 77.79,
    topTerms: ["president", "us", "said", "could", "space", "government", "may", "afp", "years", "says"],
    description: "National policy, presidential elections, international diplomacy, government agencies, and space exploration.",
    interpretation: "The largest foundational cluster in the dataset, capturing broad governance, political campaigns, bilateral diplomacy, space agency initiatives, and state-level affairs.",
    pcaX: 0.0116,
    pcaY: 0.0281,
    samples: [
      "Carlyle Looks Toward Commercial Aerospace (Reuters) - Private investment firm Carlyle Group, which has a reputation for making well-timed and occasionally controversial plays in the defense industry, has quietly placed its bets on another part of the market.",
      "Oil and Economy Cloud Stocks' Outlook (Reuters) - Soaring crude prices plus worries about the economy and the outlook for earnings are expected to hang over the stock market next week during the depth of the summer doldrums.",
      "Iraq Halts Oil Exports from Main Southern Pipeline (Reuters) - Authorities have halted oil export flows from the main pipeline in southern Iraq after intelligence showed a rebel militia could strike infrastructure."
    ]
  }
];

export const MODEL_METRICS = {
  totalArticles: 120000,
  clustersCount: 12,
  tfidfFeatures: 30000,
  svdDimensions: 100,
  fullDataset: {
    silhouette: 0.067100,
    daviesBouldin: 3.715731,
    calinskiHarabasz: 172.887150
  },
  controlled20kComparison: {
    sampleSize: 20000,
    classical: {
      name: "Classical (TF-IDF + SVD + K-Means)",
      features: "30,000 TF-IDF → 100D SVD",
      silhouette: 0.066929,
      daviesBouldin: 3.721973,
      calinskiHarabasz: 344.987732
    },
    semantic: {
      name: "Semantic (all-MiniLM-L6-v2 + K-Means)",
      features: "384D Dense Embeddings",
      silhouette: 0.027291,
      daviesBouldin: 4.869102,
      calinskiHarabasz: 263.004974
    }
  }
};
