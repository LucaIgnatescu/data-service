# General Architecture and Use Cases

The goal of this app is to empower non data science savvy people to record and analyze their data, while enabling those with experience to be more efficient in their workflow. 

Tere will be 3 main features:

1. Data Collection: users will be able to define their own database schemas and tables, and insert data.
2. Data Analysis: an integration with jupyter will be provided in order to analyze this data. 
3. LLM integration at every step of the way: leveraging AI's ability to code in order to assist at every step of the way. 


## Features

- Define SQL tables through a UI interface. 
- Use AI to build these tables through natural language. 
- Provide data ingestion for these tables.
- Provide a Jupyter notebook writing interface.
- Enhance the writing experience with AI. 

## Plan

*NOTE*: At first, this will use self hosted SQLite, and will be designed as a local app. 

### Part 1


- Define a data model for schema building.
- Create a UI for users to create their schemas, like supabase. 
- Implement a database integration layer, that will for now just create schemas. 
- Bring in an AI to interpret user requests as schema building. 





## Should chat control itself?

- Does anyone else need its state?
    - No, as long as it has the ability to submit and post the result to a global state
- What should be in global state?
    - The actual schema should be in higher state. 
    - So what we actually need is a schema setter, and we lift schema up. 
    - Ok good. Now when data comes back, the chat component has the ability filter how it wants to do that.
    - The only requirements is that it sends schema.
    - ok so what should happen is that chat has access (though context or props) to a bunch of setters.
    - It will use these setters to dispatch the updates from the chat. 
- Middleware for client interfacing?
    - Probably a bad idea considering server actions. 



- I need to think more about the chat interaction. 
- How do we make it such that we can abstract away, but also not?????
- I think links in chat are the way. 
- Do stuff like -> i'd like to see the schema. 
- Ok you build these 'Projects'. The projects have a chat and a database. 
- For each one, you have the ability to see everything. The notebook, the shema, everything.
- But we are designing a chat UI. So all of these you can run as popups from the chat interface. 
- YES. That's what we actually want. You will click and launch a popup, and that will present you with different screens.
- The chat will stay at the bottom, so you can keep interacting with the popup. 
- And that can work with the jupyter, it can work with anything. It's important that you're able to stay in the chat, otherwise it becomes very difficult to work with. You want to minimize movement. Ok this actually sounds like an app now nice. 






