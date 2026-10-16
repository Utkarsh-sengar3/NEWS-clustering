export interface ExampleArticle {
  title: string;
  category: string;
  expectedCluster: number;
  text: string;
}

export const EXAMPLE_ARTICLES: ExampleArticle[] = [
  {
    title: "Cloud & Enterprise Software",
    category: "Technology",
    expectedCluster: 3,
    text: "Microsoft has announced a new cloud computing platform designed to help businesses manage their applications and data more efficiently. The platform introduces improved security features, faster data processing, and tools for developers building modern web applications."
  },
  {
    title: "Crude Oil Benchmark Record",
    category: "Oil & Energy",
    expectedCluster: 6,
    text: "Crude oil prices surged toward record highs on Monday as market supply concerns intensified following refinery maintenance shutdowns in the Gulf of Mexico. Light sweet crude climbed past $46 a barrel in New York trading, prompting energy analysts to warn of elevated transport fuel costs in upcoming quarters."
  },
  {
    title: "Athens Summer Olympics Finals",
    category: "Sports",
    expectedCluster: 7,
    text: "Michael Phelps captured another gold medal in the Athens Olympic pool on Sunday, pulling away from rivals in the men's 200 meters individual medley final. The victory brought his tournament medal tally to four gold medals as the American swim squad continued its dominant performance in Greece."
  },
  {
    title: "Corporate Quarterly Earnings",
    category: "Business",
    expectedCluster: 10,
    text: "Hewlett-Packard reported a 14 percent increase in quarterly net profit today, buoyed by enterprise server sales and cost reduction initiatives. The corporation posted third-quarter revenue of $18.9 billion, beating Wall Street consensus estimates while projecting stronger operating cash flows for the fiscal year."
  },
  {
    title: "Baghdad Security Operations",
    category: "World",
    expectedCluster: 1,
    text: "Iraqi security forces and coalition troops conducted targeted operations across central Baghdad following a series of mortar strikes near government checkpoints. The interior ministry reported multiple insurgent detentions as security patrols increased along key arterial roadways."
  },
  {
    title: "National Policy & Governance",
    category: "Politics",
    expectedCluster: 11,
    text: "The president met with congressional leaders and senior cabinet members on Thursday to review international diplomatic agreements and discuss federal budget allocations for space research and renewable infrastructure initiatives."
  }
];
