// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// <ProgramSnippet>
const readline = require('readline-sync')

const settings = require('./appSettings')
const {
  establishConnectionToDb,
  saveMail,
  createDatabase,
} = require('./databaseHelpers')
const graphHelper = require('./graphHelper')

async function main() {
  let choice = 0

  const client = await establishConnectionToDb()
  await createDatabase(client)

  // Initialize Graph
  initializeGraph(settings)

  // Greet the user by name
  await greetUserAsync()

  const choices = ['Display access token', 'Get emails']

  while (choice != -1) {
    choice = readline.keyInSelect(choices, 'Select an option', {
      cancel: 'Exit',
    })

    switch (choice) {
      case -1:
        // Exit
        console.log('Goodbye...')
        break
      case 0:
        // Display access token
        await displayAccessTokenAsync()
        break
      case 1:
        // List emails from user's inbox
        await saveMailAsync()
        break
      default:
        console.log('Invalid choice! Please try again.')
    }
  }
}

main()
// </ProgramSnippet>

// <InitializeGraphSnippet>
function initializeGraph(settings) {
  graphHelper.initializeGraphForUserAuth(settings, (info) => {
    // Display the device code message to
    // the user. This tells them
    // where to go to sign in and provides the
    // code to use.
    console.log(info.message)
  })
}
// </InitializeGraphSnippet>

// <GreetUserSnippet>
async function greetUserAsync() {
  try {
    const user = await graphHelper.getUserAsync()
    console.log(`Hello, ${user?.displayName}!`)
    // For Work/school accounts, email is in mail property
    // Personal accounts, email is in userPrincipalName
    console.log(`Email: ${user?.mail ?? user?.userPrincipalName ?? ''}`)
  } catch (err) {
    console.log(`Error getting user: ${err}`)
  }
}
// </GreetUserSnippet>

// <DisplayAccessTokenSnippet>
async function displayAccessTokenAsync() {
  try {
    const userToken = await graphHelper.getUserTokenAsync()
    console.log(`User token: ${userToken}`)
  } catch (err) {
    console.log(`Error getting user access token: ${err}`)
  }
}
// </DisplayAccessTokenSnippet>

// <ListInboxSnippet>
async function saveMailAsync() {
  try {
    const client = await establishConnectionToDb()
    const urls = [
      '/me/mailFolders/SentItems/messages',
      '/me/mailFolders/inbox/messages',
    ]
    for (const url of urls) {
      const messagePage = await graphHelper.getInboxAsync(url)
      const messages = messagePage.value

      // Output each message's details
      for (const message of messages) {
        await saveMail(
          {
            subject: message.subject ?? 'NO SUBJECT',
            from: message.from?.emailAddress?.name ?? 'UNKNOWN',
            receivedAt: message.receivedDateTime,
            body: message.body?.content ?? 'NO BODY',
            conversationId: message.conversationId,
          },
          client
        )
      }

      // If @odata.nextLink is not undefined, there are more messages
      // available on the server
      const moreAvailable = messagePage['@odata.nextLink'] != undefined
      console.log(`\nMore messages available? ${moreAvailable}`)
      console.log('\nGot the first email batch')
    }

    client.end()
  } catch (err) {
    console.log(`Error getting user's inbox: ${err}`)
  }
}
// </ListInboxSnippet>
