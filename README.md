# Kinship Canada

Kinship Canada is a registered Canadian charity. This is the code for the frontend of our site, including donation forms, the dashboard, and any other pages.

## Our Stack
Kinship is built off a number of technologies. Our frontend is primarily built with NextJS and Supabase, and deployed with Vercel. We also use TailwindCSS

We store our information in both Postgres and MySQL databases, as well as AWS S3 and Supabase Storage. Our internal APIs for generating tax receipts, donation processing, and more, are primarily written in Python. 

Internal APIs are not open source but if you would like to contribute send us an email at [here](info@kinshipcanada.com).

## Repository Structure
```
.
├── components              # Contains reusable components from across the site
│   ├── Donations           # Currently empty
│   ├── Receipts            # Cards for displaying tax receipts
│   ├── Root                # Components used everywhere, like navigation
│   └── Site                # Components on frontend, like home page features
│   
├── lib                     # Functions such as Supabase client and cart functions
└── pages                   
    ├── api                 # Contains checkout api with Stripe
    ├── app                 # User dashboard
    └── receipts            # Used to display frontend receipts
```