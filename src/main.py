import discord
import os
from dotenv import load_dotenv
import random
from discord.ext import tasks, commands

BOOKS_FILE_PATH = "manga-manwha-domains.txt"

def load_books_from_file(file_path):

    try:
        with open(file_path, 'r') as file:
            books = [line.strip() for line in file.readlines()]
        return books
    except FileNotFoundError:
        print(f"Error: The file {file_path} was not found.")
        return []


all_books = load_books_from_file(BOOKS_FILE_PATH)
recommended_books = []

def reset_recommendations():
    global recommended_books
    if len(recommended_books) == len(all_books):
        print("All books have been recommended. Resetting list.")
        recommended_books = []

@tasks.loop(hours=12)
async def recommend_book():
    reset_recommendations()

    available_books = [book for book in all_books if book not in recommended_books]
    
    if available_books:
        random_book = random.choice(available_books)
        recommended_books.append(random_book)
        
        channel = client.get_channel(int(os.getenv('MANGA_CHANNEL')))
        
        if channel:
            await channel.send(f"Manga / Manwha Recommendation: {random_book}")
        else:
            print("Channel not found.")
    else:
        print("No books left to recommend.")

class Client(discord.Client):
    async def on_ready(self):
        print(f'Logged on as {self.user}!')
        recommend_book.start()
        
    async def on_message(self, message):
        if message.author == self.user:
            return
 
        if message.channel.id == int(os.getenv("r4zor_WEBHOOK_CHANNEL_ID")):
            commit_message = message.content

            if message.embeds:
                commit_message = message.embeds[0].description

            if not commit_message:
                print("No commit message")

            else:
                target_channel = self.get_channel(int(os.getenv("r4zor_TARGET_CHANNEL_ID")))


                if target_channel:
                    await target_channel.send(f"New Commit: \n {commit_message}")
                    print(f"Commit message received in {message.channel.name}: {commit_message}")

                else:
                    print("Target channel not found")

        if message.channel.id == int(os.getenv("vivian_WEBHOOK_CHANNEL_ID")):
            commit_message = message.content

            if message.embeds:
                commit_message = message.embeds[0].description

            if not commit_message:
                print("No commit message")

            else:
                target_channel = self.get_channel(int(os.getenv("vivian_TARGET_CHANNEL_ID")))


                if target_channel:
                    await target_channel.send(f"New Commit: \n {commit_message}")
                    print(f"Commit message received in {message.channel.name}: {commit_message}")

                else:
                    print("Target channel not found")


intents = discord.Intents.default()
intents.message_content = True
client = Client(intents=intents)




load_dotenv()
TOKEN = os.getenv('TOKEN')
client.run(TOKEN)

