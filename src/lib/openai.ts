import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateMovieFact(movieTitle: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a movie expert. Generate one interesting, unique fact about the given movie. Keep it concise (2-3 sentences max) and engaging. Focus on behind-the-scenes trivia, production details, or surprising facts that most people wouldn't know."
        },
        {
          role: "user",
          content: `Generate an interesting fact about the movie "${movieTitle}"`
        }
      ],
      max_tokens: 150,
      temperature: 0.8,
    })

    return response.choices[0]?.message?.content || "No interesting fact could be generated for this movie."
  } catch (error) {
    console.error('Error generating movie fact:', error)
    return "Unable to generate movie fact at this time."
  }
}