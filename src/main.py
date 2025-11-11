import discord
import os
from dotenv import load_dotenv

class Client(discord.Client):
    async def on_ready(self):
        print(f'Logged on as {self.user}!')
        
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

