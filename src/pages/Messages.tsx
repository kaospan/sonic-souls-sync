import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Send, Music, MoreHorizontal } from "lucide-react";
import Header from "@/components/Header";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState("1");
  const [newMessage, setNewMessage] = useState("");

  const conversations = [
    {
      id: "1",
      user: {
        name: "Emma Thompson",
        username: "emmamusic",
        avatar: "/placeholder.svg",
        status: "online"
      },
      lastMessage: "Did you check out that new Arctic Monkeys track?",
      timestamp: "2m",
      unread: 2,
      shared: {
        type: "track",
        title: "Body Paint",
        artist: "Arctic Monkeys"
      }
    },
    {
      id: "2",
      user: {
        name: "David Kim",
        username: "davidbeats",
        avatar: "/placeholder.svg",
        status: "offline"
      },
      lastMessage: "The concert was amazing! Thanks for the recommendation",
      timestamp: "1h",
      unread: 0
    },
    {
      id: "3",
      user: {
        name: "Sofia Martinez",
        username: "sofiavibes",
        avatar: "/placeholder.svg",
        status: "online"
      },
      lastMessage: "Love your taste in music! Let's collaborate on a playlist",
      timestamp: "3h",
      unread: 1
    }
  ];

  const messages = [
    {
      id: "1",
      sender: "other",
      content: "Hey! I saw you posted about that new Glass Animals album",
      timestamp: "10:30 AM",
      type: "text"
    },
    {
      id: "2",
      sender: "me",
      content: "Yes! Heat Waves is such a banger. Have you listened to the full album?",
      timestamp: "10:32 AM",
      type: "text"
    },
    {
      id: "3",
      sender: "other",
      content: "Just started it! The production quality is incredible",
      timestamp: "10:35 AM",
      type: "text"
    },
    {
      id: "4",
      sender: "other",
      content: "Body Paint",
      timestamp: "10:37 AM",
      type: "music",
      track: {
        title: "Body Paint",
        artist: "Arctic Monkeys",
        artwork: "/placeholder.svg",
        platform: "spotify"
      }
    },
    {
      id: "5",
      sender: "other",
      content: "Did you check out that new Arctic Monkeys track?",
      timestamp: "Just now",
      type: "text"
    }
  ];

  const selectedConversation = conversations.find(conv => conv.id === selectedChat);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-music bg-clip-text text-transparent">
          Messages
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="p-4 bg-card border-border lg:col-span-1">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search conversations..." 
                  className="pl-10 bg-muted/30 border-border"
                />
              </div>
            </div>
            
            <div className="space-y-2 overflow-y-auto">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedChat(conversation.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedChat === conversation.id 
                      ? 'bg-music-primary/20 border border-music-primary/30' 
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={conversation.user.avatar} />
                        <AvatarFallback>{conversation.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {conversation.user.status === 'online' && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium truncate">{conversation.user.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                          {conversation.unread > 0 && (
                            <Badge variant="default" className="px-2 py-1 text-xs">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                      {conversation.shared && (
                        <div className="flex items-center gap-1 mt-1">
                          <Music className="h-3 w-3 text-music-secondary" />
                          <span className="text-xs text-music-secondary">Shared music</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Chat Window */}
          <Card className="bg-card border-border lg:col-span-2 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={selectedConversation.user.avatar} />
                        <AvatarFallback>{selectedConversation.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{selectedConversation.user.name}</h3>
                        <p className="text-sm text-muted-foreground">@{selectedConversation.user.username}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.sender === 'me'
                            ? 'bg-music-primary text-white'
                            : 'bg-muted/50'
                        }`}
                      >
                        {message.type === 'music' && message.track ? (
                          <div className="mb-2">
                            <div className="flex items-center gap-2 p-2 bg-black/20 rounded">
                              <img src={message.track.artwork} alt={message.track.title} className="w-8 h-8 rounded" />
                              <div>
                                <p className="text-sm font-medium">{message.track.title}</p>
                                <p className="text-xs opacity-80">{message.track.artist}</p>
                              </div>
                              <Music className="h-4 w-4 ml-auto" />
                            </div>
                          </div>
                        ) : null}
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'me' ? 'text-white/70' : 'text-muted-foreground'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && newMessage.trim()) {
                          // Handle send message
                          setNewMessage("");
                        }
                      }}
                    />
                    <Button variant="music" size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-muted-foreground">Select a conversation to start messaging</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;