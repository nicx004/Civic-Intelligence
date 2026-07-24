from ollama import Client

client = Client(host="http://localhost:11434")

print(client.list())

response = client.chat(
    model="qwen3:8b",
    messages=[
        {
            "role": "user",
            "content": "Say hello"
        }
    ]
)

print(response)