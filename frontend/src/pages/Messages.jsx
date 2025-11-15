import { useState, useEffect } from 'react';
import api from '../utils/api';
import { formatRelativeTime } from '../utils/formatDate';

const Messages = () => {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchThreads();
  }, []);

  useEffect(() => {
    if (selectedThread) {
      fetchMessages(selectedThread.threadId);
      const interval = setInterval(() => {
        fetchMessages(selectedThread.threadId);
      }, 5000); // Poll every 5 seconds
      return () => clearInterval(interval);
    }
  }, [selectedThread]);

  const fetchThreads = async () => {
    try {
      const response = await api.get('/messages/threads');
      setThreads(response.data.data.threads);
      if (response.data.data.threads.length > 0 && !selectedThread) {
        setSelectedThread(response.data.data.threads[0]);
      }
    } catch (error) {
      console.error('Error fetching threads:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (threadId) => {
    try {
      const response = await api.get(`/messages/${threadId}`);
      setMessages(response.data.data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedThread) return;

    try {
      await api.post('/messages', {
        recipient: selectedThread.otherUser._id,
        content: newMessage,
      });
      setNewMessage('');
      fetchMessages(selectedThread.threadId);
      fetchThreads();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Messages</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Threads List */}
        <div className="lg:col-span-1 card overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Conversations</h2>
          {threads.length === 0 ? (
            <p className="text-gray-500">No conversations yet</p>
          ) : (
            <div className="space-y-2">
              {threads.map((thread) => (
                <button
                  key={thread.threadId}
                  onClick={() => setSelectedThread(thread)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedThread?.threadId === thread.threadId
                      ? 'bg-indigo-50 border-2 border-indigo-600'
                      : 'hover:bg-gray-50 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {thread.otherUser.avatar ? (
                      <img
                        src={thread.otherUser.avatar}
                        alt={thread.otherUser.name}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                        {thread.otherUser.name?.charAt(0)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{thread.otherUser.name}</p>
                      <p className="text-sm text-gray-600 truncate">
                        {thread.lastMessage.content}
                      </p>
                    </div>
                    {thread.unreadCount > 0 && (
                      <span className="bg-indigo-600 text-white text-xs rounded-full px-2 py-1">
                        {thread.unreadCount}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="lg:col-span-2 flex flex-col card">
          {selectedThread ? (
            <>
              <div className="border-b pb-4 mb-4">
                <div className="flex items-center space-x-3">
                  {selectedThread.otherUser.avatar ? (
                    <img
                      src={selectedThread.otherUser.avatar}
                      alt={selectedThread.otherUser.name}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                      {selectedThread.otherUser.name?.charAt(0)}
                    </div>
                  )}
                  <h3 className="font-semibold">{selectedThread.otherUser.name}</h3>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((message) => (
                  <div
                    key={message._id}
                    className={`flex ${
                      message.sender._id === selectedThread.otherUser._id
                        ? 'justify-start'
                        : 'justify-end'
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender._id === selectedThread.otherUser._id
                          ? 'bg-gray-100'
                          : 'bg-indigo-600 text-white'
                      }`}
                    >
                      <p>{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender._id === selectedThread.otherUser._id
                            ? 'text-gray-500'
                            : 'text-indigo-100'
                        }`}
                      >
                        {formatRelativeTime(message.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="input flex-1"
                  placeholder="Type a message..."
                />
                <button type="submit" className="btn btn-primary">
                  Send
                </button>
              </form>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;

