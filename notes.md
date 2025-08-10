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






