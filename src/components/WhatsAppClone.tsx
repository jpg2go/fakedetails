import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, MoreVertical, Phone, Video, Smile, Paperclip, Mic, Send, ArrowLeft, MessageCircle, CheckCheck, Check, Download, Monitor, Smartphone, Users, X, Plus, File, CircleUser as UserCircle, Archive, Star, VolumeX, Trash2, CheckCircle, Play, Reply, Forward, Copy, CreditCard as Edit3, Pin, Moon, Sun, Video as VideoIcon, StopCircle, Menu, User, Palette, Shield, RefreshCw } from 'lucide-react';
import html2canvas from 'html2canvas';

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  sender: 'me' | 'them';
  status?: 'sent' | 'delivered' | 'read';
  type?: 'text' | 'image' | 'file' | 'audio';
  fileUrl?: string;
  fileName?: string;
  replyTo?: string;
  replyToMessage?: Message;
  reactions?: { emoji: string; users: string[] }[];
  isStarred?: boolean;
  isEdited?: boolean;
  deletedForEveryone?: boolean;
}

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  online: boolean;
  messages: Message[];
  isPinned?: boolean;
  isTyping?: boolean;
  isGroup?: boolean;
  groupMembers?: number;
  draft?: string;
  isMuted?: boolean;
  isArchived?: boolean;
  disappearingTimer?: number;
}

interface Status {
  id: string;
  name: string;
  avatar: string;
  time: string;
  viewed: boolean;
  isMine?: boolean;
  content?: string;
  backgroundColor?: string;
  type?: 'text' | 'image';
}

const WhatsAppClone: React.FC = () => {
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('desktop');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messageText, setMessageText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'chats' | 'status' | 'calls'>('chats');
  const [showChatMenu, setShowChatMenu] = useState(false);
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [chatBackground, setChatBackground] = useState<string>('default');
  const [customBackground, setCustomBackground] = useState<string | null>(null);
  const [showThemeSettings, setShowThemeSettings] = useState(false);
  const backgroundInputRef = useRef<HTMLInputElement>(null);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [showMessageMenu, setShowMessageMenu] = useState<string | null>(null);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const [showForwardDialog, setShowForwardDialog] = useState(false);
  const [chatFilter, setChatFilter] = useState<'all' | 'unread' | 'groups'>('all');
  const [showReactionPicker, setShowReactionPicker] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [videoRecording, setVideoRecording] = useState(false);
  const [videoRecordingTime, setVideoRecordingTime] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [scrollSpeed, setScrollSpeed] = useState(50);
  const [autoScroll, setAutoScroll] = useState(true);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [showNewContactModal, setShowNewContactModal] = useState(false);
  const [showNewGroupModal, setShowNewGroupModal] = useState(false);
  const [showNewCommunityModal, setShowNewCommunityModal] = useState(false);
  const [newContactForm, setNewContactForm] = useState({ name: '', phone: '', avatar: '' });
  const [newGroupForm, setNewGroupForm] = useState({ name: '', description: '', members: [] as string[] });
  const [newCommunityForm, setNewCommunityForm] = useState({ name: '', description: '' });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<Chat | null>(null);
  const [showCreateStatusModal, setShowCreateStatusModal] = useState(false);
  const [newStatusText, setNewStatusText] = useState('');
  const [statusType, setStatusType] = useState<'text' | 'image'>('text');
  const [statusBackgroundColor, setStatusBackgroundColor] = useState('#075E54');
  const [selectedContactForStatus, setSelectedContactForStatus] = useState<string>('me');
  const [viewingStatus, setViewingStatus] = useState<Status | null>(null);
  const [statusProgress, setStatusProgress] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const videoRecordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [statuses, setStatuses] = useState<Status[]>([
    {
      id: '1',
      name: 'My Status',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=150',
      time: 'Tap to add status update',
      viewed: false,
      isMine: true
    },
    {
      id: '2',
      name: 'Mom',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=150',
      time: '45 minutes ago',
      viewed: false
    },
    {
      id: '3',
      name: 'John Smith',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=150',
      time: '2 hours ago',
      viewed: true
    },
    {
      id: '4',
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150',
      time: 'Today, 9:30 AM',
      viewed: false
    }
  ]);

  // Content sections copied from WhatsAppGenerator
  const features = [
    {
      icon: User,
      title: 'Realistic Chat UI',
      description: 'Authentic WhatsApp interface with proper message bubbles, timestamps, and status indicators.'
    },
    {
      icon: Monitor,
      title: 'Device Frames',
      description: 'Choose between iPhone and Android frames with accurate status bars and navigation elements.'
    },
    {
      icon: Palette,
      title: 'Theme Support',
      description: 'Switch between light and dark themes to match your target platform and user preferences.'
    },
    {
      icon: Download,
      title: 'Export & Share',
      description: 'Export screenshots or plain text copies for docs, bug reports, tutorials, and stakeholder reviews.'
    },
    {
      icon: Shield,
      title: 'Privacy‑First',
      description: 'All generation happens locally in your browser — nothing is uploaded or stored on our servers.'
    },
    {
      icon: RefreshCw,
      title: 'Quick Presets',
      description: 'Load prebuilt conversation templates to speed up screenshots, demos, and test cases.'
    }
  ];

  const faqs = [
    {
      question: 'Is this a real WhatsApp chat?',
      answer: 'No. This is a simulator for mock conversations — it does not connect to WhatsApp or send messages.'
    },
    {
      question: 'Can I export the chats?',
      answer: 'Yes. Export as an image or plain text, or copy the conversation to your clipboard for sharing.'
    },
    {
      question: 'Is any data uploaded?',
      answer: 'No. All generation happens locally in your browser — we do not transmit or store your content.'
    }
  ];

  useEffect(() => {
    if (videoRecording && autoScroll && chatContainerRef.current) {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }

      const container = chatContainerRef.current;
      scrollIntervalRef.current = setInterval(() => {
        if (container.scrollTop + container.clientHeight < container.scrollHeight) {
          container.scrollTop += scrollSpeed / 10;
        }
      }, 100);
    } else if (scrollIntervalRef.current && (!autoScroll || !videoRecording)) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [videoRecording, autoScroll, scrollSpeed]);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('whatsapp_dark_mode');
    const savedBackground = localStorage.getItem('whatsapp_background');
    const savedCustomBg = localStorage.getItem('whatsapp_custom_background');

    if (savedDarkMode) setDarkMode(savedDarkMode === 'true');
    if (savedBackground) setChatBackground(savedBackground);
    if (savedCustomBg) setCustomBackground(savedCustomBg);

    const savedChats = localStorage.getItem('whatsapp_clone_chats');
    if (savedChats) {
      const parsed = JSON.parse(savedChats);
      setChats(parsed.map((chat: Chat) => ({
        ...chat,
        messages: chat.messages.map((msg: Message) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      })));
    } else {
      const initialChats: Chat[] = [
        {
          id: '1',
          name: 'Mom',
          avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=150',
          lastMessage: 'Love you! See you soon 💕',
          timestamp: '10:30 AM',
          unreadCount: 0,
          online: true,
          isPinned: true,
          messages: [
            { id: 'm1', text: 'Hi honey! How are you?', timestamp: new Date(Date.now() - 3600000), sender: 'them', status: 'read' },
            { id: 'm2', text: "I'm good mom! How are you?", timestamp: new Date(Date.now() - 3000000), sender: 'me', status: 'read' },
            { id: 'm3', text: 'Doing great! Just wanted to check in', timestamp: new Date(Date.now() - 2400000), sender: 'them', status: 'read' },
            { id: 'm4', text: 'Thanks for checking in!', timestamp: new Date(Date.now() - 1800000), sender: 'me', status: 'delivered' },
            { id: 'm5', text: 'Love you! See you soon 💕', timestamp: new Date(Date.now() - 600000), sender: 'them', status: 'read' }
          ]
        },
        {
          id: '2',
          name: 'John Smith',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=150',
          lastMessage: 'Perfect! See you at 3',
          timestamp: '9:45 AM',
          unreadCount: 2,
          online: false,
          messages: [
            { id: 'm1', text: 'Hey! Are we still meeting today?', timestamp: new Date(Date.now() - 7200000), sender: 'them', status: 'read' },
            { id: 'm2', text: 'Yes! What time works for you?', timestamp: new Date(Date.now() - 6000000), sender: 'me', status: 'read' },
            { id: 'm3', text: 'How about 3pm?', timestamp: new Date(Date.now() - 5400000), sender: 'them', status: 'read' },
            { id: 'm4', text: 'Perfect! See you at 3', timestamp: new Date(Date.now() - 4800000), sender: 'me', status: 'delivered' }
          ]
        },
        {
          id: '3',
          name: 'Design Team',
          avatar: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?w=150',
          lastMessage: 'Sarah: New mockups are ready!',
          timestamp: 'Yesterday',
          unreadCount: 5,
          online: false,
          isGroup: true,
          groupMembers: 8,
          messages: [
            { id: 'm1', text: 'Team meeting at 2pm today', timestamp: new Date(Date.now() - 86400000), sender: 'them', status: 'read' },
            { id: 'm2', text: 'Got it, thanks!', timestamp: new Date(Date.now() - 82800000), sender: 'me', status: 'read' },
            { id: 'm3', text: 'New mockups are ready!', timestamp: new Date(Date.now() - 79200000), sender: 'them', status: 'delivered' }
          ]
        },
        {
          id: '4',
          name: 'Sarah Johnson',
          avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150',
          lastMessage: 'Let me know!',
          timestamp: '2:51 PM',
          unreadCount: 0,
          online: true,
          messages: [
            { id: 'm1', text: 'Hey! How are you?', timestamp: new Date(Date.now() - 172800000), sender: 'them', status: 'read' },
            { id: 'm2', text: "I'm doing great! Thanks for asking. How about you?", timestamp: new Date(Date.now() - 169200000), sender: 'me', status: 'read' },
            { id: 'm3', text: "I'm good too! Are we still meeting tomorrow?", timestamp: new Date(Date.now() - 165600000), sender: 'them', status: 'read' },
            { id: 'm4', text: 'Let me know!', timestamp: new Date(Date.now() - 162000000), sender: 'them', status: 'read' }
          ]
        },
        {
          id: '5',
          name: 'Family',
          avatar: 'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?w=150',
          lastMessage: 'Morning! Have a great day!',
          timestamp: '1:56 PM',
          unreadCount: 0,
          online: false,
          isGroup: true,
          groupMembers: 5,
          messages: [
            { id: 'm1', text: 'Good morning everyone!', timestamp: new Date(Date.now() - 259200000), sender: 'them', status: 'read' },
            { id: 'm2', text: 'Morning!', timestamp: new Date(Date.now() - 255600000), sender: 'me', status: 'read' },
            { id: 'm3', text: 'Morning! Have a great day!', timestamp: new Date(Date.now() - 252000000), sender: 'them', status: 'read' }
          ]
        }
      ];
      setChats(initialChats);
      localStorage.setItem('whatsapp_clone_chats', JSON.stringify(initialChats));
    }
  }, []);

  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('whatsapp_clone_chats', JSON.stringify(chats));
    }
  }, [chats]);

  useEffect(() => {
    localStorage.setItem('whatsapp_dark_mode', darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('whatsapp_background', chatBackground);
  }, [chatBackground]);

  useEffect(() => {
    if (customBackground) {
      localStorage.setItem('whatsapp_custom_background', customBackground);
    } else {
      localStorage.removeItem('whatsapp_custom_background');
    }
  }, [customBackground]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedChat?.messages]);

  useEffect(() => {
    if (selectedChat) {
      setMessageText(selectedChat.draft || '');
    }
  }, [selectedChat]);

  useEffect(() => {
    if (selectedChat && messageText) {
      const timeoutId = setTimeout(() => {
        setChats(prev => prev.map(chat =>
          chat.id === selectedChat.id ? { ...chat, draft: messageText } : chat
        ));
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [messageText, selectedChat]);

  useEffect(() => {
    if (viewingStatus) {
      const duration = 5000;
      const interval = 50;
      const increment = (interval / duration) * 100;

      const timer = setInterval(() => {
        setStatusProgress(prev => {
          const newProgress = prev + increment;
          if (newProgress >= 100) {
            clearInterval(timer);
            setTimeout(() => {
              setViewingStatus(null);
              setStatusProgress(0);
              if (viewingStatus) {
                setStatuses(prevStatuses => prevStatuses.map(s =>
                  s.id === viewingStatus.id ? { ...s, viewed: true } : s
                ));
              }
            }, 100);
            return 100;
          }
          return newProgress;
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [viewingStatus]);

  const simulateTyping = (chatId: string) => {
    setChats(prev => prev.map(chat =>
      chat.id === chatId ? { ...chat, isTyping: true } : chat
    ));

    setTimeout(() => {
      setChats(prev => prev.map(chat =>
        chat.id === chatId ? { ...chat, isTyping: false } : chat
      ));
    }, 3000);
  };

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedChat) return;

    const newMessage: Message = {
      id: `m${Date.now()}`,
      text: messageText,
      timestamp: new Date(),
      sender: 'me',
      status: 'sent',
      replyTo: replyingTo?.id,
      replyToMessage: replyingTo || undefined
    };

    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === selectedChat.id
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              lastMessage: messageText,
              timestamp: formatTimestamp(new Date())
            }
          : chat
      )
    );

    setSelectedChat(prev =>
      prev ? { ...prev, messages: [...prev.messages, newMessage] } : null
    );

    setMessageText('');
    setReplyingTo(null);

    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === selectedChat.id ? { ...chat, draft: '' } : chat
      )
    );

    simulateTyping(selectedChat.id);

    setTimeout(() => {
      setChats(prevChats =>
        prevChats.map(chat =>
          chat.id === selectedChat.id
            ? {
                ...chat,
                messages: chat.messages.map(msg =>
                  msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
                )
              }
            : chat
        )
      );

      if (selectedChat) {
        setSelectedChat(prev =>
          prev ? {
            ...prev,
            messages: prev.messages.map(msg =>
              msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
            )
          } : null
        );
      }
    }, 1000);

    setTimeout(() => {
      setChats(prevChats =>
        prevChats.map(chat =>
          chat.id === selectedChat.id
            ? {
                ...chat,
                messages: chat.messages.map(msg =>
                  msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
                )
              }
            : chat
        )
      );

      if (selectedChat) {
        setSelectedChat(prev =>
          prev ? {
            ...prev,
            messages: prev.messages.map(msg =>
              msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
            )
          } : null
        );
      }
    }, 3000);
  };

  const sendAsThem = () => {
    if (!messageText.trim() || !selectedChat) return;

    const newMessage: Message = {
      id: `m${Date.now()}`,
      text: messageText,
      timestamp: new Date(),
      sender: 'them',
      status: 'delivered'
    };

    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === selectedChat.id
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              lastMessage: messageText,
              timestamp: formatTimestamp(new Date())
            }
          : chat
      )
    );

    setSelectedChat(prev =>
      prev ? { ...prev, messages: [...prev.messages, newMessage] } : null
    );

    setMessageText('');
    setReplyingTo(null);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedChat) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileUrl = e.target?.result as string;
      const fileType = file.type.startsWith('image/') ? 'image' : 'file';

      const newMessage: Message = {
        id: `m${Date.now()}`,
        text: fileType === 'image' ? '📷 Photo' : `📎 ${file.name}`,
        timestamp: new Date(),
        sender: 'me',
        status: 'sent',
        type: fileType,
        fileUrl: fileUrl,
        fileName: file.name
      };

      setChats(prevChats =>
        prevChats.map(chat =>
          chat.id === selectedChat.id
            ? {
                ...chat,
                messages: [...chat.messages, newMessage],
                lastMessage: newMessage.text,
                timestamp: formatTimestamp(new Date())
              }
            : chat
        )
      );

      setSelectedChat(prev =>
        prev ? { ...prev, messages: [...prev.messages, newMessage] } : null
      );
    };

    reader.readAsDataURL(file);
  };

  const startRecording = () => {
    setRecording(true);
    setRecordingTime(0);
    recordingIntervalRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setRecording(false);
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
    }

    if (!selectedChat || recordingTime === 0) return;

    const newMessage: Message = {
      id: `m${Date.now()}`,
      text: `🎤 Voice message (0:${recordingTime.toString().padStart(2, '0')})`,
      timestamp: new Date(),
      sender: 'me',
      status: 'sent',
      type: 'audio'
    };

    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === selectedChat.id
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              lastMessage: newMessage.text,
              timestamp: formatTimestamp(new Date())
            }
          : chat
      )
    );

    setSelectedChat(prev =>
      prev ? { ...prev, messages: [...prev.messages, newMessage] } : null
    );

    setRecordingTime(0);
  };

  const startVideoRecording = async () => {
    try {
      if (!chatContainerRef.current && !chatWindowRef.current) return;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Prefer capturing the entire chat window (header + messages) when available
      const container = chatWindowRef.current || chatContainerRef.current;
      if (!container) return;

      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;

      const stream = canvas.captureStream(30);
      const recorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9'
      });

      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `whatsapp-chat-recording-${Date.now()}.webm`;
        link.click();

        if (videoRecordingIntervalRef.current) {
          clearInterval(videoRecordingIntervalRef.current);
        }
        setVideoRecordingTime(0);
      };

      const captureFrame = async () => {
        try {
          const capturedCanvas = await html2canvas(container, {
            background: 'transparent',
            logging: false,
            useCORS: true,
            allowTaint: true
          });
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(capturedCanvas, 0, 0, canvas.width, canvas.height);
        } catch (error) {
          console.error('Frame capture error:', error);
        }
      };

      recorder.start();
      setMediaRecorder(recorder);
      setVideoRecording(true);
      setVideoRecordingTime(0);

      videoRecordingIntervalRef.current = setInterval(() => {
        setVideoRecordingTime(prev => prev + 1);
      }, 1000);

      const frameInterval = setInterval(captureFrame, 100);

      const cleanup = () => {
        clearInterval(frameInterval);
      };

      setTimeout(() => {
        if (recorder.state !== 'inactive') {
          cleanup();
        }
      }, 300000);

    } catch (error) {
      console.error('Error starting video recording:', error);
      alert('Unable to start recording. Please try again.');
    }
  };

  const stopVideoRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
    setVideoRecording(false);
    setMediaRecorder(null);
  };

  const formatTimestamp = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const formatMessageTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const shouldShowDateDivider = (currentMsg: Message, previousMsg?: Message): boolean => {
    if (!previousMsg) return true;
    const currentDate = new Date(currentMsg.timestamp).toDateString();
    const previousDate = new Date(previousMsg.timestamp).toDateString();
    return currentDate !== previousDate;
  };

  const formatDateDivider = (date: Date): string => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const msgDate = date.toDateString();

    if (msgDate === today) return 'TODAY';
    if (msgDate === yesterday) return 'YESTERDAY';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
  };

  const downloadChat = async () => {
    if (!chatWindowRef.current) return;

    try {
      const element = chatWindowRef.current;

      // Clear any input text for clean screenshot
      setMessageText('');

      // Wait for state update to clear input field
      await new Promise(resolve => setTimeout(resolve, 100));

      // Clone the chat element to avoid layout shifts from overlays/active modals
      const clone = element.cloneNode(true) as HTMLElement;

      // Preserve original styling and layout
      clone.style.width = `${element.offsetWidth}px`;
      clone.style.height = `${element.scrollHeight}px`;
      clone.style.overflow = 'visible';
      clone.style.boxSizing = 'border-box';
      clone.style.display = 'flex';
      clone.style.flexDirection = 'column';

      // Ensure images in clone are CORS-friendly
      const imgs = clone.querySelectorAll('img');
      imgs.forEach((img) => {
        try {
          (img as HTMLImageElement).crossOrigin = 'anonymous';
        } catch (e) {
          // ignore
        }
      });

      // Remove menus, overlays, and interactive elements that shouldn't be in screenshot
      const menusToRemove = clone.querySelectorAll('[class*="absolute"][class*="shadow"]');
      menusToRemove.forEach(menu => {
        const menuElement = menu as HTMLElement;
        if (menuElement.textContent?.includes('Reply') ||
            menuElement.textContent?.includes('Delete') ||
            menuElement.textContent?.includes('Forward')) {
          menuElement.remove();
        }
      });

      // Preserve message container flex alignment
      const originalMessageContainers = element.querySelectorAll('[data-sender]');
      const clonedMessageContainers = clone.querySelectorAll('[data-sender]');
      clonedMessageContainers.forEach((container, index) => {
        const containerElement = container as HTMLElement;
        const originalContainer = originalMessageContainers[index] as HTMLElement;
        if (originalContainer) {
          const sender = containerElement.getAttribute('data-sender');
          containerElement.style.display = 'flex';
          containerElement.style.justifyContent = sender === 'me' ? 'flex-end' : 'flex-start';
          containerElement.style.marginBottom = '0.25rem';
          containerElement.style.width = '100%';
        }
      });

      // Preserve exact styling in chat bubbles
      const originalBubbles = element.querySelectorAll('.wa-bubble');
      const clonedBubbles = clone.querySelectorAll('.wa-bubble');
      clonedBubbles.forEach((bubble, bubbleIndex) => {
        const bubbleElement = bubble as HTMLElement;
        const originalBubble = originalBubbles[bubbleIndex] as HTMLElement;
        if (!originalBubble) return;
        const computedStyle = window.getComputedStyle(originalBubble);

        // Preserve all computed styles that affect layout
        bubbleElement.style.position = 'relative';
        bubbleElement.style.display = 'inline-block';
        bubbleElement.style.maxWidth = '65%';
        bubbleElement.style.padding = computedStyle.padding;
        bubbleElement.style.borderRadius = computedStyle.borderRadius;
        bubbleElement.style.backgroundColor = computedStyle.backgroundColor;
        bubbleElement.style.boxShadow = computedStyle.boxShadow;
        bubbleElement.style.wordWrap = 'break-word';
        bubbleElement.style.whiteSpace = 'pre-wrap';
        bubbleElement.style.textAlign = 'left';

        // Preserve text and timestamp container flex layout
        const originalFlexContainers = originalBubble.querySelectorAll('.flex.items-end');
        const clonedFlexContainers = bubbleElement.querySelectorAll('.flex.items-end');
        clonedFlexContainers.forEach((flexContainer, flexIndex) => {
          const flexElement = flexContainer as HTMLElement;
          const originalFlex = originalFlexContainers[flexIndex] as HTMLElement;
          if (originalFlex) {
            const flexComputed = window.getComputedStyle(originalFlex);
            flexElement.style.display = 'flex';
            flexElement.style.alignItems = 'flex-end';
            flexElement.style.gap = flexComputed.gap || '0.25rem';
          }
        });

        // Preserve text element styling
        const originalTextElements = originalBubble.querySelectorAll('p');
        const clonedTextElements = bubbleElement.querySelectorAll('p');
        clonedTextElements.forEach((textElement, textIndex) => {
          const textEl = textElement as HTMLElement;
          const originalText = originalTextElements[textIndex] as HTMLElement;
          if (originalText) {
            const textComputed = window.getComputedStyle(originalText);
            textEl.style.margin = '0';
            textEl.style.fontSize = textComputed.fontSize;
            textEl.style.color = textComputed.color;
            textEl.style.lineHeight = textComputed.lineHeight;
            textEl.style.wordBreak = 'break-word';
            textEl.style.whiteSpace = 'pre-wrap';
            textEl.style.textAlign = 'left';
            textEl.style.paddingBottom = textComputed.paddingBottom;
          }
        });

        // Preserve timestamp and status styling
        const originalTimestamps = originalBubble.querySelectorAll('.text-\\[11px\\]');
        const clonedTimestamps = bubbleElement.querySelectorAll('.text-\\[11px\\]');
        clonedTimestamps.forEach((timestamp, tsIndex) => {
          const tsElement = timestamp as HTMLElement;
          const originalTs = originalTimestamps[tsIndex] as HTMLElement;
          if (originalTs) {
            const tsComputed = window.getComputedStyle(originalTs);
            tsElement.style.fontSize = '11px';
            tsElement.style.whiteSpace = 'nowrap';
            tsElement.style.flexShrink = '0';
          }
        });
      });

      // Place clone offscreen to allow accurate rendering without affecting layout
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.left = '-9999px';
      container.style.top = '0';
      container.style.pointerEvents = 'none';
      container.appendChild(clone);
      document.body.appendChild(container);

      // Wait a tick for fonts/images to layout
      await new Promise(resolve => setTimeout(resolve, 250));

      // Use html2canvas with reliable options for better screenshot quality
      const canvas = await html2canvas(clone, {
        backgroundColor: darkMode ? '#0B141A' : '#E5DDD5',
        useCORS: true,
        allowTaint: false,
        logging: false,
        scale: 2
      });

      // Clean up cloned DOM
      document.body.removeChild(container);

      const link = document.createElement('a');
      link.download = `whatsapp-chat-${selectedChat?.name || 'export'}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download chat. Please try again.');
    }
  };

  const handleReplyToMessage = (message: Message) => {
    setReplyingTo(message);
    setShowMessageMenu(null);
  };

  const handleStarMessage = (messageId: string) => {
    if (!selectedChat) return;

    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === selectedChat.id
          ? {
              ...chat,
              messages: chat.messages.map(msg =>
                msg.id === messageId ? { ...msg, isStarred: !msg.isStarred } : msg
              )
            }
          : chat
      )
    );

    setSelectedChat(prev =>
      prev ? {
        ...prev,
        messages: prev.messages.map(msg =>
          msg.id === messageId ? { ...msg, isStarred: !msg.isStarred } : msg
        )
      } : null
    );

    setShowMessageMenu(null);
  };

  const handleDeleteMessage = (messageId: string, deleteForEveryone: boolean) => {
    if (!selectedChat) return;

    if (deleteForEveryone) {
      setChats(prevChats =>
        prevChats.map(chat =>
          chat.id === selectedChat.id
            ? {
                ...chat,
                messages: chat.messages.map(msg =>
                  msg.id === messageId
                    ? { ...msg, text: 'This message was deleted', deletedForEveryone: true }
                    : msg
                )
              }
            : chat
        )
      );

      setSelectedChat(prev =>
        prev ? {
          ...prev,
          messages: prev.messages.map(msg =>
            msg.id === messageId
              ? { ...msg, text: 'This message was deleted', deletedForEveryone: true }
              : msg
          )
        } : null
      );
    } else {
      setChats(prevChats =>
        prevChats.map(chat =>
          chat.id === selectedChat.id
            ? {
                ...chat,
                messages: chat.messages.filter(msg => msg.id !== messageId)
              }
            : chat
        )
      );

      setSelectedChat(prev =>
        prev ? {
          ...prev,
          messages: prev.messages.filter(msg => msg.id !== messageId)
        } : null
      );
    }

    setShowMessageMenu(null);
  };

  const handleEditMessage = (message: Message) => {
    setEditingMessage(message);
    setMessageText(message.text);
    setShowMessageMenu(null);
  };

  const handleSaveEdit = () => {
    if (!editingMessage || !messageText.trim() || !selectedChat) return;

    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === selectedChat.id
          ? {
              ...chat,
              messages: chat.messages.map(msg =>
                msg.id === editingMessage.id
                  ? { ...msg, text: messageText, isEdited: true }
                  : msg
              )
            }
          : chat
      )
    );

    setSelectedChat(prev =>
      prev ? {
        ...prev,
        messages: prev.messages.map(msg =>
          msg.id === editingMessage.id
            ? { ...msg, text: messageText, isEdited: true }
            : msg
        )
      } : null
    );

    setMessageText('');
    setEditingMessage(null);
  };

  const handleAddReaction = (messageId: string, emoji: string) => {
    if (!selectedChat) return;

    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === selectedChat.id
          ? {
              ...chat,
              messages: chat.messages.map(msg => {
                if (msg.id === messageId) {
                  const reactions = msg.reactions || [];
                  const existingReaction = reactions.find(r => r.emoji === emoji);

                  if (existingReaction) {
                    if (existingReaction.users.includes('me')) {
                      return {
                        ...msg,
                        reactions: reactions.map(r =>
                          r.emoji === emoji
                            ? { ...r, users: r.users.filter(u => u !== 'me') }
                            : r
                        ).filter(r => r.users.length > 0)
                      };
                    } else {
                      return {
                        ...msg,
                        reactions: reactions.map(r =>
                          r.emoji === emoji
                            ? { ...r, users: [...r.users, 'me'] }
                            : r
                        )
                      };
                    }
                  } else {
                    return {
                      ...msg,
                      reactions: [...reactions, { emoji, users: ['me'] }]
                    };
                  }
                }
                return msg;
              })
            }
          : chat
      )
    );

    setSelectedChat(prev =>
      prev ? {
        ...prev,
        messages: prev.messages.map(msg => {
          if (msg.id === messageId) {
            const reactions = msg.reactions || [];
            const existingReaction = reactions.find(r => r.emoji === emoji);

            if (existingReaction) {
              if (existingReaction.users.includes('me')) {
                return {
                  ...msg,
                  reactions: reactions.map(r =>
                    r.emoji === emoji
                      ? { ...r, users: r.users.filter(u => u !== 'me') }
                      : r
                  ).filter(r => r.users.length > 0)
                };
              } else {
                return {
                  ...msg,
                  reactions: reactions.map(r =>
                    r.emoji === emoji
                      ? { ...r, users: [...r.users, 'me'] }
                      : r
                  )
                };
              }
            } else {
              return {
                ...msg,
                reactions: [...reactions, { emoji, users: ['me'] }]
              };
            }
          }
          return msg;
        })
      } : null
    );

    setShowReactionPicker(null);
  };


  const handleCreateContact = () => {
    if (!newContactForm.name.trim() || !newContactForm.phone.trim()) return;

    const newChat: Chat = {
      id: `c${Date.now()}`,
      name: newContactForm.name,
      avatar: newContactForm.avatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=150',
      lastMessage: '',
      timestamp: '',
      unreadCount: 0,
      online: false,
      messages: [],
      isPinned: false
    };

    setChats(prev => [...prev, newChat]);
    setNewContactForm({ name: '', phone: '', avatar: '' });
    setShowNewContactModal(false);
    setShowPlusMenu(false);
  };

  const handleCreateGroup = () => {
    if (!newGroupForm.name.trim() || newGroupForm.members.length === 0) return;

    const newGroup: Chat = {
      id: `g${Date.now()}`,
      name: newGroupForm.name,
      avatar: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?w=150',
      lastMessage: 'Group created',
      timestamp: formatTimestamp(new Date()),
      unreadCount: 0,
      online: false,
      isGroup: true,
      groupMembers: newGroupForm.members.length + 1,
      messages: [
        {
          id: `m${Date.now()}`,
          text: `You created group "${newGroupForm.name}"`,
          timestamp: new Date(),
          sender: 'them',
          status: 'read'
        }
      ],
      isPinned: false
    };

    setChats(prev => [...prev, newGroup]);
    setNewGroupForm({ name: '', description: '', members: [] });
    setShowNewGroupModal(false);
    setShowPlusMenu(false);
  };

  const handleCreateStatus = () => {
    if (!newStatusText.trim() && statusType === 'text') return;

    if (selectedContactForStatus === 'me') {
      setStatuses(prev => {
        const myStatusIndex = prev.findIndex(s => s.isMine);
        if (myStatusIndex !== -1) {
          const updated = [...prev];
          updated[myStatusIndex] = {
            ...updated[myStatusIndex],
            time: 'Just now',
            viewed: false,
            content: newStatusText,
            backgroundColor: statusBackgroundColor,
            type: statusType
          };
          return updated;
        }
        return prev;
      });
    } else {
      const selectedChat = chats.find(c => c.id === selectedContactForStatus);
      if (selectedChat) {
        setStatuses(prev => {
          const existingStatusIndex = prev.findIndex(s => s.name === selectedChat.name && !s.isMine);
          if (existingStatusIndex !== -1) {
            const updated = [...prev];
            updated[existingStatusIndex] = {
              ...updated[existingStatusIndex],
              time: 'Just now',
              viewed: false,
              content: newStatusText,
              backgroundColor: statusBackgroundColor,
              type: statusType
            };
            return updated;
          } else {
            const newStatus: Status = {
              id: `s${Date.now()}`,
              name: selectedChat.name,
              avatar: selectedChat.avatar,
              time: 'Just now',
              viewed: false,
              isMine: false,
              content: newStatusText,
              backgroundColor: statusBackgroundColor,
              type: statusType
            };
            return [...prev, newStatus];
          }
        });
      }
    }

    setNewStatusText('');
    setStatusBackgroundColor('#075E54');
    setSelectedContactForStatus('me');
    setShowCreateStatusModal(false);
  };

  const handleCreateCommunity = () => {
    if (!newCommunityForm.name.trim()) return;

    const newCommunity: Chat = {
      id: `cm${Date.now()}`,
      name: newCommunityForm.name,
      avatar: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?w=150',
      lastMessage: 'Community created',
      timestamp: formatTimestamp(new Date()),
      unreadCount: 0,
      online: false,
      isGroup: true,
      groupMembers: 1,
      messages: [
        {
          id: `m${Date.now()}`,
          text: `Welcome to ${newCommunityForm.name} community!`,
          timestamp: new Date(),
          sender: 'them',
          status: 'read'
        }
      ],
      isPinned: false
    };

    setChats(prev => [...prev, newCommunity]);
    setNewCommunityForm({ name: '', description: '' });
    setShowNewCommunityModal(false);
    setShowPlusMenu(false);
  };

  const handleDeleteContact = () => {
    if (!contactToDelete) return;

    setChats(prev => prev.filter(chat => chat.id !== contactToDelete.id));

    if (selectedChat?.id === contactToDelete.id) {
      setSelectedChat(null);
    }

    setShowDeleteConfirm(false);
    setShowProfileInfo(false);
    setContactToDelete(null);
  };

  const handleBlockContact = () => {
    if (!selectedChat) return;

    setChats(prev => prev.map(chat =>
      chat.id === selectedChat.id
        ? { ...chat, lastMessage: 'You blocked this contact' }
        : chat
    ));

    setShowProfileInfo(false);
  };

  const handleReportContact = () => {
    if (!selectedChat) return;

    setShowProfileInfo(false);
  };

  const backgroundThemes = {
    default: {
      image: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cg fill='%23D9DBD5' fill-opacity='0.2'%3E%3Cpath d='M0 0h260v260H0z'/%3E%3Cpath d='M130 0L0 130M260 0L130 130M260 130L130 260M130 130L0 260'/%3E%3C/g%3E%3C/svg%3E")`,
      color: '#EFEAE2'
    },
    dark: {
      image: 'none',
      color: '#0B141A'
    },
    purple: {
      image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'transparent'
    },
    ocean: {
      image: 'linear-gradient(135deg, #667eea 0%, #00d2ff 100%)',
      color: 'transparent'
    },
    sunset: {
      image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      color: 'transparent'
    },
    forest: {
      image: 'linear-gradient(135deg, #0ba360 0%, #3cba92 100%)',
      color: 'transparent'
    },
    custom: {
      image: customBackground ? `url(${customBackground})` : 'none',
      color: customBackground ? 'transparent' : '#EFEAE2'
    }
  };

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCustomBackground(result);
        setChatBackground('custom');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleForwardMessage = (messageIds: string[], targetChatIds: string[]) => {
    targetChatIds.forEach(targetChatId => {
      messageIds.forEach(messageId => {
        const message = selectedChat?.messages.find(m => m.id === messageId);
        if (message) {
          const forwardedMessage: Message = {
            ...message,
            id: `m${Date.now()}_${Math.random()}`,
            timestamp: new Date(),
            sender: 'me',
            status: 'sent',
            replyTo: undefined,
            replyToMessage: undefined
          };

          setChats(prevChats =>
            prevChats.map(chat =>
              chat.id === targetChatId
                ? {
                    ...chat,
                    messages: [...chat.messages, forwardedMessage],
                    lastMessage: message.text,
                    timestamp: formatTimestamp(new Date())
                  }
                : chat
            )
          );
        }
      });
    });

    setSelectedMessages([]);
    setShowForwardDialog(false);
  };

  const filteredChats = chats
    .filter(chat => {
      if (chatFilter === 'unread') return chat.unreadCount > 0;
      if (chatFilter === 'groups') return chat.isGroup;
      return true;
    })
    .filter(chat =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(chat => !chat.isArchived)
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });

  const emojis = ['😀', '😂', '😍', '🥰', '😘', '😊', '😁', '😄', '😅', '😆', '🤣', '😇', '🙂', '🙃', '😉', '😌', '😋', '😎', '🤓', '🧐', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '👍', '👎', '👊', '✊', '🤛', '🤜', '🤞', '✌️', '🤟', '🤘', '👌', '🤌', '🤏', '👈', '👉', '👆', '👇', '☝️', '👋', '🤚', '🖐️', '✋', '🖖', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💅', '🤳', '💪', '🔥', '💯', '💢', '💥', '💫', '💦', '💨'];

  const renderStatusIcon = (status?: 'sent' | 'delivered' | 'read') => {
    if (status === 'read') {
      return <CheckCheck className="w-4 h-4 text-[#53BDEB]" />;
    } else if (status === 'delivered') {
      return <CheckCheck className="w-4 h-4 text-gray-500" />;
    } else {
      return <Check className="w-4 h-4 text-gray-500" />;
    }
  };

  const renderStatusTab = () => (
    <div className={`flex flex-col h-full ${darkMode ? 'bg-[#111B21]' : 'bg-white'}`}>
      <div className={`${darkMode ? 'bg-[#202C33]' : 'bg-[#F0F2F5]'} px-4 py-4 flex items-center justify-between ${darkMode ? 'border-[#2A3942]' : 'border-gray-200'} border-b`}>
        <div className="flex items-center">
          {viewMode === 'mobile' && (
            <button
              onClick={() => setActiveTab('chats')}
              className={`mr-4 ${darkMode ? 'text-[#8696A0] hover:bg-[#2A3942]' : 'text-[#54656F] hover:bg-[#E4E6E8]'} p-2 rounded-full transition-colors`}
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
          <h1 className={`${darkMode ? 'text-[#E9EDEF]' : 'text-[#111B21]'} text-xl font-medium`}>Updates</h1>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowCreateStatusModal(true)}
            className={`${darkMode ? 'text-[#8696A0] hover:bg-[#2A3942]' : 'text-[#54656F] hover:bg-[#E4E6E8]'} p-2 rounded-full transition-colors`}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto ${darkMode ? 'bg-[#111B21]' : 'bg-white'}`}>
        <div className="px-4 py-3">
          <h3 className={`${darkMode ? 'text-[#8696A0]' : 'text-[#54656F]'} text-sm font-medium mb-3`}>Status</h3>

          {statuses.map((status) => (
            <div
              key={status.id}
              onClick={() => {
                if (status.isMine && status.time === 'Tap to add status update') {
                  setShowCreateStatusModal(true);
                } else if (status.content) {
                  setViewingStatus(status);
                  setStatusProgress(0);
                }
              }}
              className={`flex items-center py-3 cursor-pointer ${darkMode ? 'hover:bg-[#202C33]' : 'hover:bg-[#F5F6F6]'} rounded-lg px-2 -mx-2`}
            >
              <div className="relative">
                <div className={`w-14 h-14 rounded-full p-0.5 ${
                  status.isMine ? 'bg-[#00A884]' : status.viewed ? 'bg-gray-300' : 'bg-[#00A884]'
                }`}>
                  <img
                    src={status.avatar}
                    alt={status.name}
                    className="w-full h-full rounded-full object-cover border-2 border-white"
                  />
                </div>
                {status.isMine && status.time === 'Tap to add status update' && (
                  <div className="absolute bottom-0 right-0 bg-[#00A884] rounded-full p-1">
                    <Plus className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <div className="ml-3 flex-1">
                <h3 className={`${darkMode ? 'text-[#E9EDEF]' : 'text-[#111B21]'} text-[16px]`}>{status.name}</h3>
                <p className="text-[#667781] text-[14px]">{status.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={`border-t ${darkMode ? 'border-[#2A3942]' : 'border-gray-200'} mt-2`}>
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <h3 className={`${darkMode ? 'text-[#8696A0]' : 'text-[#54656F]'} text-sm font-medium`}>Channels</h3>
              <button className="text-[#00A884] text-sm font-medium">Explore</button>
            </div>
            <p className={`${darkMode ? 'text-[#8696A0]' : 'text-[#667781]'} text-sm`}>Stay updated on topics that matter to you. Find channels to follow below.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCallsTab = () => (
    <div className={`flex flex-col h-full ${darkMode ? 'bg-[#111B21]' : 'bg-white'}`}>
      <div className={`${darkMode ? 'bg-[#202C33] border-[#2A3942]' : 'bg-[#F0F2F5] border-gray-200'} px-4 py-4 flex items-center justify-between border-b`}>
        <div className="flex items-center">
          {viewMode === 'mobile' && (
            <button
              onClick={() => setActiveTab('chats')}
              className="mr-4 text-[#54656F] hover:bg-gray-200"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
          <h1 className="text-[#111B21] text-xl font-medium">Calls</h1>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-[#54656F] hover:bg-gray-200 p-2 rounded-full">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-[#54656F] hover:bg-gray-200 p-2 rounded-full">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-white px-4">
        <div className="py-3 border-b border-gray-200">
          <button className="flex items-center text-[#111B21] hover:bg-[#F5F6F6] w-full py-2 px-2 rounded-lg">
            <div className="w-10 h-10 bg-[#00A884] rounded-full flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <span className="ml-3 font-medium">Create call link</span>
          </button>
        </div>

        <div className="py-3">
          <h3 className="text-[#54656F] text-sm mb-3">Recent</h3>

          <div className="space-y-1">
            <div className="flex items-center py-3 hover:bg-[#F5F6F6] rounded-lg px-2 -mx-2">
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=150"
                alt="Call"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="ml-3 flex-1">
                <h3 className="text-[#111B21] text-[16px]">John Smith</h3>
                <div className="flex items-center space-x-2 text-[#667781] text-sm">
                  <Video className="w-4 h-4 text-[#00A884]" />
                  <span>Incoming</span>
                  <span>•</span>
                  <span>Today, 2:30 PM</span>
                </div>
              </div>
              <button className="text-[#00A884]">
                <Phone className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center py-3 hover:bg-[#F5F6F6] rounded-lg px-2 -mx-2">
              <img
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150"
                alt="Call"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="ml-3 flex-1">
                <h3 className="text-[#111B21] text-[16px]">Sarah Johnson</h3>
                <div className="flex items-center space-x-2 text-[#667781] text-sm">
                  <Phone className="w-4 h-4 text-red-500" />
                  <span>Missed</span>
                  <span>•</span>
                  <span>Yesterday, 5:15 PM</span>
                </div>
              </div>
              <button className="text-[#00A884]">
                <Video className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center py-3 hover:bg-[#F5F6F6] rounded-lg px-2 -mx-2">
              <img
                src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=150"
                alt="Call"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="ml-3 flex-1">
                <h3 className="text-[#111B21] text-[16px]">Mom</h3>
                <div className="flex items-center space-x-2 text-[#667781] text-sm">
                  <Video className="w-4 h-4 text-[#00A884]" />
                  <span>Outgoing</span>
                  <span>•</span>
                  <span>Yesterday, 10:00 AM</span>
                </div>
              </div>
              <button className="text-[#00A884]">
                <Video className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderChatList = () => (
    <div className={`flex flex-col h-full ${darkMode ? 'bg-[#111B21]' : 'bg-white'}`}>
      <div className={`${darkMode ? 'bg-[#111B21]' : 'bg-white'} px-4 py-4`}>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[#00A884] text-[24px] font-semibold">WhatsApp</h1>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setShowThemeSettings(!showThemeSettings)}
              className={`${darkMode ? 'text-[#8696A0] hover:bg-[#2A3942]' : 'text-[#54656F] hover:bg-[#F0F2F5]'} p-2 rounded-full transition-colors`}
              title="Theme Settings"
            >
              <Edit3 className="w-5 h-5" />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowPlusMenu(!showPlusMenu)}
                className="text-[#54656F] hover:bg-[#F0F2F5] p-2 rounded-full transition-colors"
              >
                <Plus className="w-6 h-6" />
              </button>
              {showPlusMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50 py-2 border border-gray-200">
                  <button
                    onClick={() => {
                      setShowNewContactModal(true);
                      setShowPlusMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left text-[#111B21] hover:bg-[#F5F6F6] text-sm flex items-center space-x-3"
                  >
                    <UserCircle className="w-5 h-5" />
                    <span>New contact</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowNewGroupModal(true);
                      setShowPlusMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left text-[#111B21] hover:bg-[#F5F6F6] text-sm flex items-center space-x-3"
                  >
                    <Users className="w-5 h-5" />
                    <span>New group</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowNewCommunityModal(true);
                      setShowPlusMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left text-[#111B21] hover:bg-[#F5F6F6] text-sm flex items-center space-x-3"
                  >
                    <Users className="w-5 h-5" />
                    <span>New community</span>
                  </button>
                </div>
              )}
            </div>
            <button className="text-[#54656F] hover:bg-[#F0F2F5] p-2 rounded-full transition-colors">
              <MoreVertical className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="relative mb-4">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8696A0]" />
          <input
            type="text"
            placeholder="Search or start a new chat"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-11 pr-4 py-2.5 rounded-lg ${darkMode ? 'bg-[#2A3942] text-[#E9EDEF] placeholder-[#8696A0] focus:bg-[#3B4A54]' : 'bg-[#F0F2F5] text-[#111B21] placeholder-[#8696A0] focus:bg-[#E8EAED]'} text-[15px] outline-none transition-all`}
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setChatFilter('all')}
            className={`px-5 py-1.5 rounded-full text-[14px] font-medium transition-colors ${
              chatFilter === 'all'
                ? 'bg-[#D1F4DD] text-[#00A884]'
                : 'bg-[#F0F2F5] text-[#5E5E5E] hover:bg-[#E8EAED]'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setChatFilter('unread')}
            className={`px-5 py-1.5 rounded-full text-[14px] font-medium transition-colors ${
              chatFilter === 'unread'
                ? 'bg-[#D1F4DD] text-[#00A884]'
                : 'bg-[#F0F2F5] text-[#5E5E5E] hover:bg-[#E8EAED]'
            }`}
          >
            Unread
          </button>
          <button
            onClick={() => setChatFilter('groups')}
            className={`px-5 py-1.5 rounded-full text-[14px] font-medium transition-colors ${
              chatFilter === 'groups'
                ? 'bg-[#D1F4DD] text-[#00A884]'
                : 'bg-[#F0F2F5] text-[#5E5E5E] hover:bg-[#E8EAED]'
            }`}
          >
            Favourites
          </button>
          <button
            onClick={() => setChatFilter('groups')}
            className={`px-5 py-1.5 rounded-full text-[14px] font-medium transition-colors ${
              chatFilter === 'groups'
                ? 'bg-[#D1F4DD] text-[#00A884]'
                : 'bg-[#F0F2F5] text-[#5E5E5E] hover:bg-[#E8EAED]'
            }`}
          >
            Groups
          </button>
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto ${darkMode ? 'bg-[#111B21]' : 'bg-white'}`}>
        {filteredChats.map(chat => (
          <div
            key={chat.id}
            onClick={() => setSelectedChat(chat)}
            className={`flex items-center px-4 py-3 cursor-pointer ${
              darkMode
                ? `hover:bg-[#2A3942] ${selectedChat?.id === chat.id ? 'bg-[#2A3942]' : ''}`
                : `hover:bg-[#F5F6F6] ${selectedChat?.id === chat.id ? 'bg-[#F0F2F5]' : ''}`
            }`}
          >
            <div className="relative flex-shrink-0">
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-[49px] h-[49px] rounded-full object-cover"
                crossOrigin="anonymous"
              />
              {chat.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#00A884] border-2 border-white rounded-full"></div>
              )}
            </div>
            <div className={`ml-3 flex-1 min-w-0 border-b ${darkMode ? 'border-[#2A3942]' : 'border-[#E9EDEF]'} pb-3`}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <h3 className={`font-normal ${darkMode ? 'text-[#E9EDEF]' : 'text-[#111B21]'} text-[16px] truncate`}>{chat.name}</h3>
                  {chat.isGroup && (
                    <Users className="w-4 h-4 text-[#667781]" />
                  )}
                  {chat.isPinned && (
                    <Pin className="w-3 h-3 text-[#667781]" />
                  )}
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <span className="text-[12px] text-[#667781]">{chat.timestamp}</span>
                  {chat.isMuted && (
                    <VolumeX className="w-4 h-4 text-[#667781]" />
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center min-w-0 flex-1">
                  {chat.isTyping ? (
                    <span className="text-[14px] text-[#00A884] italic">typing...</span>
                  ) : (
                    <>
                      {chat.lastMessage === chat.messages[chat.messages.length - 1]?.text &&
                       chat.messages[chat.messages.length - 1]?.sender === 'me' && (
                        <CheckCheck className="w-4 h-4 text-[#53BDEB] mr-1 flex-shrink-0" />
                      )}
                      <p className="text-[14px] text-[#667781] truncate">{chat.lastMessage}</p>
                    </>
                  )}
                </div>
                {chat.unreadCount > 0 && (
                  <span className="flex-shrink-0 bg-[#00A884] text-white text-[12px] rounded-full min-w-[20px] h-[20px] flex items-center justify-center font-medium ml-2 px-1.5">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`${darkMode ? 'bg-[#202C33] border-[#2A3942]' : 'bg-white border-gray-200'} border-t`}>
        <div className="flex items-center justify-around py-1">
          <button
            onClick={() => setActiveTab('chats')}
            className={`flex flex-col items-center px-8 py-2 relative ${
              activeTab === 'chats' ? 'text-[#00A884]' : darkMode ? 'text-[#8696A0]' : 'text-[#54656F]'
            }`}
          >
            <svg className="w-6 h-6 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span className="text-[13px] font-medium">Chats</span>
          </button>
          <button
            onClick={() => setActiveTab('status')}
            className={`flex flex-col items-center px-8 py-2 relative ${
              activeTab === 'status' ? 'text-[#00A884]' : darkMode ? 'text-[#8696A0]' : 'text-[#54656F]'
            }`}
          >
            <svg className="w-6 h-6 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
            <span className="text-[13px] font-medium">Updates</span>
          </button>
          <button
            onClick={() => setActiveTab('calls')}
            className={`flex flex-col items-center px-8 py-2 relative ${
              activeTab === 'calls' ? 'text-[#00A884]' : darkMode ? 'text-[#8696A0]' : 'text-[#54656F]'
            }`}
          >
            <svg className="w-6 h-6 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span className="text-[13px] font-medium">Calls</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderChatWindow = () => {
    if (!selectedChat) {
      return (
        <div className={`flex-1 flex flex-col items-center justify-center ${darkMode ? 'bg-[#0B141A] border-[#2A3942]' : 'bg-[#F0F2F5] border-[#D1D7DB]'} border-l`}>
          <div className="text-center max-w-md">
            <div className="w-80 h-80 mx-auto mb-8 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-[#D9E4DD] flex items-center justify-center">
                  <MessageCircle className="w-32 h-32 text-[#8696A0]" />
                </div>
              </div>
            </div>
            <h2 className={`text-4xl font-light ${darkMode ? 'text-[#8696A0]' : 'text-[#41525D]'} mb-3`}>WhatsApp Web</h2>
            <p className={`${darkMode ? 'text-[#8696A0]' : 'text-[#667781]'} text-sm leading-relaxed mb-8`}>
              Send and receive messages without keeping your phone online.<br />
              Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
            </p>
            <div className="flex items-center justify-center space-x-1 text-[#00A884] text-sm">
              <span className="w-1 h-1 rounded-full bg-[#00A884]"></span>
              <span>End-to-end encrypted</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div ref={chatWindowRef} className="flex-1 flex flex-col h-full" style={{ backgroundColor: darkMode ? '#0B141A' : '#E5DDD5' }}>
        <div className={`${
          viewMode === 'mobile'
            ? 'bg-[#075E54]'
            : darkMode
              ? 'bg-[#202C33] border-[#2A3942]'
              : 'bg-[#F0F2F5] border-gray-200'
        } px-4 py-2.5 flex items-center justify-between border-l flex-shrink-0`}>
          <div className="flex items-center flex-1">
            <img
              src={selectedChat.avatar}
              alt={selectedChat.name}
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
              onClick={() => setShowProfileInfo(true)}
              crossOrigin="anonymous"
            />
            <div className="ml-3 flex-1">
              <h2 className={`${
                viewMode === 'mobile'
                  ? 'text-white'
                  : darkMode
                    ? 'text-[#E9EDEF]'
                    : 'text-[#111B21]'
              } font-normal text-[16px]`}>{selectedChat.name}</h2>
              {viewMode !== 'mobile' && (
                <p className="text-[#667781] text-[13px]">
                  {selectedChat.isTyping ? (
                    <span className="text-[#00A884]">typing...</span>
                  ) : selectedChat.online ? (
                    'online'
                  ) : (
                    `last seen at ${selectedChat.timestamp}`
                  )}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {viewMode === 'mobile' ? (
              <>
                <button className="text-white hover:bg-[#056B5E] p-2 rounded-full transition-colors">
                  <Video className="w-6 h-6" />
                </button>
                <button className="text-white hover:bg-[#056B5E] p-2 rounded-full transition-colors">
                  <Phone className="w-6 h-6" />
                </button>
              </>
            ) : (
              <>
                <button className="text-[#54656F] hover:bg-[#E4E6E8] p-2 rounded-full transition-colors">
                  <Video className="w-5 h-5" />
                </button>
                <button className="text-[#54656F] hover:bg-[#E4E6E8] p-2 rounded-full transition-colors">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="text-[#54656F] hover:bg-[#E4E6E8] p-2 rounded-full transition-colors">
                  <Search className="w-5 h-5" />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowChatMenu(!showChatMenu)}
                    className="text-[#54656F] hover:bg-[#E4E6E8] p-2 rounded-full transition-colors"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                  {showChatMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50 py-2 border border-gray-200">
                  <button
                    onClick={() => {
                      setShowProfileInfo(true);
                      setShowChatMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left text-[#111B21] hover:bg-[#F5F6F6] text-sm flex items-center space-x-3"
                  >
                    <UserCircle className="w-4 h-4" />
                    <span>Contact info</span>
                  </button>
                  <button className="w-full px-4 py-3 text-left text-[#111B21] hover:bg-[#F5F6F6] text-sm flex items-center space-x-3">
                    <VolumeX className="w-4 h-4" />
                    <span>Mute notifications</span>
                  </button>
                  <button className="w-full px-4 py-3 text-left text-[#111B21] hover:bg-[#F5F6F6] text-sm flex items-center space-x-3">
                    <Archive className="w-4 h-4" />
                    <span>Archive chat</span>
                  </button>
                  <button
                    onClick={() => {
                      setContactToDelete(selectedChat);
                      setShowDeleteConfirm(true);
                      setShowChatMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left text-[#111B21] hover:bg-[#F5F6F6] text-sm flex items-center space-x-3"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                    <span className="text-red-500">Delete contact</span>
                  </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto px-4 py-3 relative"
          style={{
            backgroundImage: backgroundThemes[chatBackground as keyof typeof backgroundThemes]?.image || backgroundThemes.default.image,
            backgroundColor: backgroundThemes[chatBackground as keyof typeof backgroundThemes]?.color || backgroundThemes.default.color,
            backgroundSize: chatBackground === 'custom' ? 'cover' : 'auto',
            backgroundPosition: 'center',
            backgroundRepeat: chatBackground === 'custom' ? 'no-repeat' : 'repeat'
          }}
        >
          {/* Recording overlay intentionally removed for preview */}
          <div className="space-y-2 max-w-5xl mx-auto">
            <div className="flex justify-center my-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-sm px-3 py-1.5">
                <span className="text-xs text-[#54656F] font-medium flex items-center space-x-2">
                  <span className="w-3 h-3 bg-[#00A884] rounded-full flex items-center justify-center">
                    <CheckCircle className="w-2 h-2 text-white" />
                  </span>
                  <span>Messages are end-to-end encrypted. No one outside of this chat can read them.</span>
                </span>
              </div>
            </div>

            {selectedChat.messages.map((message, index) => {
              const previousMessage = index > 0 ? selectedChat.messages[index - 1] : undefined;
              const showDateDivider = shouldShowDateDivider(message, previousMessage);

              return (
                <React.Fragment key={message.id}>
                  {showDateDivider && (
                    <div className="flex justify-center my-3">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-sm px-3 py-1.5">
                        <span className="text-xs text-[#54656F] font-medium">
                          {formatDateDivider(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  )}
                  <div
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} mb-1`}
                    data-sender={message.sender}
                  >
                    <div
                      onClick={() => setShowMessageMenu(showMessageMenu === message.id ? null : message.id)}
                      className={`wa-bubble relative rounded-lg px-2 py-1.5 shadow-sm max-w-[65%] cursor-pointer hover:shadow-md transition-shadow ${
                        message.sender === 'me'
                          ? 'bg-[#D9FDD3]'
                          : 'bg-white'
                      } ${message.deletedForEveryone ? 'opacity-60 italic' : ''}`}
                      style={{
                        borderRadius: message.sender === 'me' ? '7.5px 7.5px 0px 7.5px' : '7.5px 7.5px 7.5px 0px'
                      }}
                    >
                        {message.isStarred && (
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 absolute -top-1 -right-1" />
                        )}

                        {message.replyToMessage && (
                          <div className="bg-black/10 rounded px-2 py-1 mb-1 border-l-2 border-[#00A884]">
                            <p className="text-xs text-[#00A884] font-medium">
                              {message.replyToMessage.sender === 'me' ? 'You' : selectedChat.name}
                            </p>
                            <p className="text-xs text-[#667781] truncate">{message.replyToMessage.text}</p>
                          </div>
                        )}

                        {message.type === 'image' && message.fileUrl && (
                          <div className="mb-1">
                            <img
                              src={message.fileUrl}
                              alt="Shared"
                              className="rounded-lg max-w-full max-h-64 object-cover"
                              crossOrigin="anonymous"
                            />
                          </div>
                        )}
                        {message.type === 'file' && (
                          <div className="flex items-center space-x-2 mb-1 bg-black/5 rounded p-2">
                            <File className="w-8 h-8 text-[#00A884]" />
                            <div>
                              <p className="text-sm font-medium text-[#111B21]">{message.fileName}</p>
                              <p className="text-xs text-[#667781]">Document</p>
                            </div>
                          </div>
                        )}
                        {message.type === 'audio' && (
                          <div className="flex items-center space-x-2 bg-black/5 rounded p-2 mb-1">
                            <button className="bg-[#00A884] rounded-full p-2">
                              <Play className="w-4 h-4 text-white" />
                            </button>
                            <div className="flex-1 h-6 bg-gray-300 rounded-full relative">
                              <div className="absolute inset-0 flex items-center px-2">
                                <div className="h-0.5 bg-[#00A884] rounded-full" style={{ width: '40%' }}></div>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="flex items-end gap-1">
                          <p className="text-[#111B21] text-[14.2px] break-words whitespace-pre-wrap leading-[19px] pb-[3px]">
                            {message.text}
                          </p>
                          <div className="flex items-center gap-1 flex-shrink-0 pb-[2px]">
                            {message.isEdited && (
                              <span className="text-[10px] text-[#667781] italic">edited</span>
                            )}
                            <span className="text-[11px] text-[#667781] whitespace-nowrap">
                              {formatMessageTime(message.timestamp)}
                            </span>
                            {message.sender === 'me' && (
                              <span className="inline-flex items-center">
                                {renderStatusIcon(message.status)}
                              </span>
                            )}
                          </div>
                        </div>

                        {message.reactions && message.reactions.length > 0 && (
                          <div className="flex gap-1 mt-1 flex-wrap">
                            {message.reactions.map((reaction, idx) => (
                              <button
                                key={idx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddReaction(message.id, reaction.emoji);
                                }}
                                className="bg-white border border-gray-200 rounded-full px-1.5 py-0.5 text-xs flex items-center gap-0.5 hover:bg-gray-50"
                              >
                                <span>{reaction.emoji}</span>
                                <span className="text-[10px] text-[#667781]">{reaction.users.length}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                    {showMessageMenu === message.id && (
                      <div className="absolute top-0 right-0 mt-8 bg-white rounded-lg shadow-2xl z-50 py-1 border border-gray-200 min-w-[180px]">
                        <button
                          onClick={() => handleReplyToMessage(message)}
                          className="w-full px-4 py-2 text-left text-sm text-[#111B21] hover:bg-[#F5F6F6] flex items-center gap-2"
                        >
                          <Reply className="w-4 h-4" />
                          <span>Reply</span>
                        </button>
                        <button
                          onClick={() => {
                            setShowReactionPicker(message.id);
                            setShowMessageMenu(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-[#111B21] hover:bg-[#F5F6F6] flex items-center gap-2"
                        >
                          <Smile className="w-4 h-4" />
                          <span>React</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedMessages([message.id]);
                            setShowForwardDialog(true);
                            setShowMessageMenu(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-[#111B21] hover:bg-[#F5F6F6] flex items-center gap-2"
                        >
                          <Forward className="w-4 h-4" />
                          <span>Forward</span>
                        </button>
                        <button
                          onClick={() => handleStarMessage(message.id)}
                          className="w-full px-4 py-2 text-left text-sm text-[#111B21] hover:bg-[#F5F6F6] flex items-center gap-2"
                        >
                          <Star className={`w-4 h-4 ${message.isStarred ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                          <span>{message.isStarred ? 'Unstar' : 'Star'}</span>
                        </button>
                        {message.sender === 'me' && !message.deletedForEveryone && (
                          <button
                            onClick={() => handleEditMessage(message)}
                            className="w-full px-4 py-2 text-left text-sm text-[#111B21] hover:bg-[#F5F6F6] flex items-center gap-2"
                          >
                            <Edit3 className="w-4 h-4" />
                            <span>Edit</span>
                          </button>
                        )}
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(message.text);
                            setShowMessageMenu(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-[#111B21] hover:bg-[#F5F6F6] flex items-center gap-2"
                        >
                          <Copy className="w-4 h-4" />
                          <span>Copy</span>
                        </button>
                        <div className="border-t border-gray-200 my-1"></div>
                        {message.sender === 'me' && (
                          <button
                            onClick={() => handleDeleteMessage(message.id, true)}
                            className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-[#F5F6F6] flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete for everyone</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteMessage(message.id, false)}
                          className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-[#F5F6F6] flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete for me</span>
                        </button>
                      </div>
                    )}

                    {showReactionPicker === message.id && (
                      <div className="absolute top-0 right-0 mt-8 bg-white rounded-lg shadow-2xl z-50 p-2 border border-gray-200">
                        <div className="flex gap-1">
                          {['❤️', '😂', '😮', '😢', '🙏', '👍'].map((emoji) => (
                            <button
                              key={emoji}
                              onClick={() => handleAddReaction(message.id, emoji)}
                              className="hover:scale-125 transition-transform text-2xl p-1"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </React.Fragment>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="bg-[#F0F2F5] flex-shrink-0">
          {(replyingTo || editingMessage) && (
            <div className="px-4 pt-2 pb-1">
              <div className="bg-white rounded-lg p-2 flex items-center justify-between border-l-4 border-[#00A884]">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#00A884] font-medium">
                    {editingMessage ? 'Edit message' : `Replying to ${replyingTo?.sender === 'me' ? 'yourself' : selectedChat?.name}`}
                  </p>
                  <p className="text-sm text-[#667781] truncate">
                    {(editingMessage || replyingTo)?.text}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setReplyingTo(null);
                    setEditingMessage(null);
                    setMessageText('');
                  }}
                  className="text-[#54656F] hover:text-[#111B21] ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          <div className={`px-4 py-2 flex items-center gap-2 ${darkMode ? 'bg-[#202C33]' : 'bg-white'}`}>
            <div className={`flex-1 ${darkMode ? 'bg-[#2A3942]' : 'bg-[#F0F2F5]'} rounded-full flex items-center gap-2 px-3`}>
              <button
                className="text-[#54656F] hover:bg-[#E4E6E8] p-1 rounded-full transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="w-6 h-6" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                onChange={handleFileUpload}
              />
              <button
                className="text-[#54656F] hover:bg-[#E4E6E8] p-1 rounded-full transition-colors"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <Smile className="w-6 h-6" />
              </button>
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    if (editingMessage) {
                      handleSaveEdit();
                    } else {
                      handleSendMessage();
                    }
                  }
                }}
                placeholder="Type a message"
                className={`flex-1 py-2.5 text-[15px] ${darkMode ? 'text-[#E9EDEF] placeholder-[#8696A0]' : 'text-[#111B21] placeholder-[#667781]'} outline-none bg-transparent`}
              />
            </div>
            {messageText.trim() ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={editingMessage ? handleSaveEdit : handleSendMessage}
                  aria-label="Send message"
                  className="bg-[#00A884] text-white p-3 rounded-full hover:bg-[#008F6D] transition-colors flex-shrink-0 flex items-center justify-center"
                >
                  <Send className="w-5 h-5" style={{ transform: 'rotate(45deg)', transformOrigin: 'center' }} />
                </button>
                <button
                  onClick={sendAsThem}
                  title="Send as them"
                  className="bg-[#06A57A] text-white p-3 rounded-full hover:bg-[#008F6D] transition-colors flex-shrink-0 flex items-center justify-center"
                >
                  <Send className="w-5 h-5" style={{ transform: 'rotate(-45deg)', transformOrigin: 'center' }} />
                </button>
              </div>
            ) : (
              <button
                onMouseDown={startRecording}
                onMouseUp={stopRecording}
                onMouseLeave={stopRecording}
                className={`${
                  recording ? 'bg-red-500 animate-pulse' : 'bg-transparent'
                } text-[#54656F] hover:bg-[#E4E6E8] p-2.5 rounded-full transition-colors flex-shrink-0`}
              >
                <Mic className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>

        {recording && (
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-2xl px-6 py-3 flex items-center space-x-3 border border-gray-200">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-[#111B21] font-medium">Recording... {recordingTime}s</span>
          </div>
        )}

        {showEmojiPicker && (
          <div className="absolute bottom-16 left-4 bg-white rounded-xl shadow-2xl p-4 z-50 w-[420px] max-h-[450px] overflow-y-auto border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-700">Emojis</h3>
              <button
                onClick={() => setShowEmojiPicker(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-9 gap-1">
              {emojis.map((emoji, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setMessageText(prev => prev + emoji);
                    setShowEmojiPicker(false);
                  }}
                  className="text-2xl hover:bg-gray-100 p-2 rounded transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {showProfileInfo && (
          <div className="absolute inset-0 bg-white z-50 overflow-y-auto">
            <div className="bg-[#F0F2F5] px-4 py-4 flex items-center border-b border-gray-200">
              <button
                onClick={() => setShowProfileInfo(false)}
                className="mr-4 text-[#54656F] hover:text-[#111B21]"
              >
                <X className="w-6 h-6" />
              </button>
              <h1 className="text-[#111B21] text-xl font-medium">Contact info</h1>
            </div>

            <div className="bg-white py-6">
              <div className="flex flex-col items-center">
                <img
                  src={selectedChat.avatar}
                  alt={selectedChat.name}
                  className="w-48 h-48 rounded-full object-cover mb-4"
                />
                <h2 className="text-[#111B21] text-2xl font-medium mb-1">{selectedChat.name}</h2>
                <p className="text-[#667781] text-sm">+1 234 567 8900</p>
              </div>

              <div className="mt-6 bg-[#F0F2F5] py-2">
                <div className="px-6 py-3">
                  <p className="text-[#667781] text-xs mb-2">About</p>
                  <p className="text-[#111B21]">Hey there! I am using WhatsApp.</p>
                </div>
              </div>

              <div className="mt-2 bg-[#F0F2F5] py-2">
                <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-200">
                  <div className="flex items-center space-x-4">
                    <VolumeX className="w-5 h-5 text-[#667781]" />
                    <span className="text-[#111B21]">Mute notifications</span>
                  </div>
                </button>
              </div>

              <div className="mt-2 bg-[#F0F2F5] py-2">
                <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-200">
                  <div className="flex items-center space-x-4">
                    <Star className="w-5 h-5 text-[#667781]" />
                    <div>
                      <p className="text-[#111B21]">Starred messages</p>
                      <p className="text-[#667781] text-sm">0</p>
                    </div>
                  </div>
                </button>
                <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-200">
                  <div className="flex items-center space-x-4">
                    <Search className="w-5 h-5 text-[#667781]" />
                    <span className="text-[#111B21]">Search in chat</span>
                  </div>
                </button>
              </div>

              <div className="mt-2 bg-[#F0F2F5] py-2">
                <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-200">
                  <div className="flex items-center space-x-4">
                    <Archive className="w-5 h-5 text-[#667781]" />
                    <span className="text-[#111B21]">Archive chat</span>
                  </div>
                </button>
              </div>

              <div className="mt-2 bg-[#F0F2F5] py-2">
                <button
                  onClick={handleBlockContact}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-200"
                >
                  <div className="flex items-center space-x-4">
                    <VolumeX className="w-5 h-5 text-red-500" />
                    <span className="text-red-500">Block {selectedChat.name}</span>
                  </div>
                </button>
                <button
                  onClick={handleReportContact}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-200"
                >
                  <div className="flex items-center space-x-4">
                    <Star className="w-5 h-5 text-red-500" />
                    <span className="text-red-500">Report contact</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setContactToDelete(selectedChat);
                    setShowDeleteConfirm(true);
                  }}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-200"
                >
                  <div className="flex items-center space-x-4">
                    <Trash2 className="w-5 h-5 text-red-500" />
                    <span className="text-red-500">Delete contact</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#0B141A]' : 'bg-[#D9DBD5]'}`}>
      {/* Header copied from WhatsAppGenerator */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Fake Detail</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-purple-600 transition-colors">Home</Link>
              <Link to="/about" className="text-gray-600 hover:text-purple-600 transition-colors">About</Link>
              <Link to="/generators" className="text-gray-600 hover:text-purple-600 transition-colors">Generators</Link>
              <Link to="/generators" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">Get Started</Link>
            </nav>

            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-2 space-y-1">
              <Link to="/" className="block w-full text-left px-3 py-2 text-gray-600 hover:text-purple-600">Home</Link>
              <Link to="/about" className="block w-full text-left px-3 py-2 text-gray-600 hover:text-purple-600">About</Link>
              <Link to="/generators" className="block w-full text-left px-3 py-2 text-gray-600 hover:text-purple-600">Generators</Link>
            </div>
          </div>
        )}
      </header>

      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <Link 
                to="/"
                className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Tools
              </Link>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              WhatsApp Chat Generator
            </h1>
            
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Build believable WhatsApp-style chats in seconds for mockups, demos, and testing. Toggle device headers and themes for pixel‑accurate screenshots.
            </p>
          </div>
        </div>
      </section>
      {/* End copied header/hero */}

      {/* Generator UI (moved here from below) */}
      <div className="max-w-[1600px] mx-auto px-4 mt-12 mb-12">
        <div className="bg-[#008069] text-white rounded-t-xl px-6 py-3 flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-[#008069]" />
            </div>
            <h1 className="text-xl font-medium">WhatsApp Clone</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all bg-white/10 hover:bg-white/20 text-white"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span className="text-sm">{darkMode ? 'Light' : 'Dark'}</span>
            </button>
            <div className="flex items-center bg-white/10 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('desktop')}
                className={`px-4 py-2 flex items-center space-x-2 transition-colors ${
                  viewMode === 'desktop'
                    ? 'bg-white text-[#008069]'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span className="text-sm font-medium">Desktop</span>
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`px-4 py-2 flex items-center space-x-2 transition-colors ${
                  viewMode === 'mobile'
                    ? 'bg-white text-[#008069]'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span className="text-sm font-medium">Mobile</span>
              </button>
            </div>
            <button
              onClick={downloadChat}
              disabled={!selectedChat}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                selectedChat
                  ? 'bg-white text-[#008069] hover:bg-gray-100'
                  : 'bg-white/20 text-white/50 cursor-not-allowed'
              }`}
            >
              <Download className="w-4 h-4" />
              <span className="text-sm">Export Chat</span>
            </button>

            <div className="flex flex-col space-y-2">
              <button
                onClick={videoRecording ? stopVideoRecording : startVideoRecording}
                disabled={!selectedChat}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  !selectedChat
                    ? 'bg-white/20 text-white/50 cursor-not-allowed'
                    : videoRecording
                    ? 'bg-red-500 text-white hover:bg-red-600 animate-pulse'
                    : 'bg-white text-[#008069] hover:bg-gray-100'
                }`}
              >
                {videoRecording ? (
                  <>
                    <StopCircle className="w-4 h-4" />
                    <span className="text-sm">Stop Recording ({Math.floor(videoRecordingTime / 60)}:{(videoRecordingTime % 60).toString().padStart(2, '0')})</span>
                  </>
                ) : (
                  <>
                    <VideoIcon className="w-4 h-4" />
                    <span className="text-sm">Record</span>
                  </>
                )}
              </button>

              {videoRecording && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-white text-xs font-medium">Auto Scroll</label>
                    <button
                      onClick={() => setAutoScroll(!autoScroll)}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                        autoScroll ? 'bg-green-500 text-white' : 'bg-white/20 text-white'
                      }`}
                    >
                      {autoScroll ? 'ON' : 'OFF'}
                    </button>
                  </div>

                  {autoScroll && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-white text-xs font-medium">Scroll Speed</label>
                        <span className="text-white text-xs">{scrollSpeed}</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="200"
                        value={scrollSpeed}
                        onChange={(e) => setScrollSpeed(Number(e.target.value))}
                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-green-500"
                      />
                      <div className="flex justify-between text-white/70 text-[10px]">
                        <span>Slow</span>
                        <span>Fast</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={`${darkMode ? 'bg-[#111B21]' : 'bg-white'} shadow-2xl overflow-hidden h-[700px]`}>
          {viewMode === 'desktop' ? (
            <div className="flex h-full">
              <div className="w-[420px]">
                {activeTab === 'chats' && renderChatList()}
                {activeTab === 'status' && renderStatusTab()}
                {activeTab === 'calls' && renderCallsTab()}
              </div>
              {renderChatWindow()}
            </div>
          ) : (
            <div className="flex h-full">
              <div className="w-[420px]">
                {activeTab === 'chats' && renderChatList()}
                {activeTab === 'status' && renderStatusTab()}
                {activeTab === 'calls' && renderCallsTab()}
              </div>
              <div className="max-w-[390px] mx-auto h-full overflow-hidden">
                {renderChatWindow()}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How to Use</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Follow these simple steps to create, customize, and export realistic WhatsApp chats.</p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 items-start">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">01</div>
              <User className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Compose Messages</h3>
              <p className="text-gray-600 leading-relaxed">Add messages as either participant, edit text inline, and set delivery/read states for each message.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">02</div>
              <Palette className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Configure Settings</h3>
              <p className="text-gray-600 leading-relaxed">Choose device type, theme (dark/light), timestamps, and read receipts to match your target platform.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">03</div>
              <Monitor className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Preview & Tweak</h3>
              <p className="text-gray-600 leading-relaxed">Use the live preview to fine-tune message order, avatars, and ephemeral/voice attachments before exporting.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">04</div>
              <Download className="w-6 h-6 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Export or Share</h3>
              <p className="text-gray-600 leading-relaxed">Download as image/video/text, copy to clipboard, or embed the conversation in tickets and docs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Fine-grained controls and presets to help you craft convincing chat screenshots quickly.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">Built for realism, speed, and team workflows — create believable chats without manual pixel-pushing.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <CheckCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Accurate Rendering</h3>
              <p className="text-gray-600 leading-relaxed">Faithful representation of WhatsApp UI elements, including status indicators and timestamps.</p>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-indigo-500 rounded-xl flex items-center justify-center mb-6">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Fully Customizable</h3>
              <p className="text-gray-600 leading-relaxed">Switch themes, device frames, and message states to match your target platform and scenario.</p>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                <Monitor className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Team Friendly</h3>
              <p className="text-gray-600 leading-relaxed">Copy, download, or embed conversations into tickets and docs so teams can reproduce issues faster.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 md:py-16 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="group">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-white/50 overflow-hidden transition-all duration-300 hover:transform hover:scale-[1.02]">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-6 md:p-8 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-blue-50/50 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        openFaq === index 
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                          : 'bg-gray-100 text-gray-600 group-hover:bg-purple-100 group-hover:text-purple-600'
                      }`}>
                        <span className="font-bold text-sm">{index + 1}</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 pr-4 group-hover:text-purple-700 transition-colors">{faq.question}</h3>
                    </div>
                    <div className="pl-4">
                      <svg className={`w-6 h-6 text-gray-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {openFaq === index && (
                    <div className="px-6 pb-6 md:px-8 md:pb-8">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showNewContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-[480px] overflow-hidden">
            <div className="bg-[#008069] text-white px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-medium">New Contact</h2>
              <button
                onClick={() => setShowNewContactModal(false)}
                className="text-white hover:bg-white/20 p-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#111B21] mb-2">Name</label>
                <input
                  type="text"
                  value={newContactForm.name}
                  onChange={(e) => setNewContactForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter contact name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-[#111B21] outline-none focus:border-[#00A884]"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-[#111B21] mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={newContactForm.phone}
                  onChange={(e) => setNewContactForm(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1 234 567 8900"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-[#111B21] outline-none focus:border-[#00A884]"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[#111B21] mb-2">Avatar URL (optional)</label>
                <input
                  type="text"
                  value={newContactForm.avatar}
                  onChange={(e) => setNewContactForm(prev => ({ ...prev, avatar: e.target.value }))}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-[#111B21] outline-none focus:border-[#00A884]"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowNewContactModal(false)}
                  className="px-6 py-2 rounded-lg text-[#111B21] hover:bg-gray-100 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateContact}
                  disabled={!newContactForm.name.trim() || !newContactForm.phone.trim()}
                  className="px-6 py-2 rounded-lg bg-[#00A884] text-white hover:bg-[#008F6D] font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Create Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showNewGroupModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-[480px] max-h-[600px] overflow-hidden">
            <div className="bg-[#008069] text-white px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-medium">New Group</h2>
              <button
                onClick={() => setShowNewGroupModal(false)}
                className="text-white hover:bg-white/20 p-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#111B21] mb-2">Group Name</label>
                <input
                  type="text"
                  value={newGroupForm.name}
                  onChange={(e) => setNewGroupForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter group name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-[#111B21] outline-none focus:border-[#00A884]"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-[#111B21] mb-2">Description (optional)</label>
                <textarea
                  value={newGroupForm.description}
                  onChange={(e) => setNewGroupForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter group description"
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-[#111B21] outline-none focus:border-[#00A884] resize-none"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[#111B21] mb-2">Add Members</label>
                <div className="border border-gray-300 rounded-lg max-h-[200px] overflow-y-auto">
                  {chats.filter(chat => !chat.isGroup).map(chat => (
                    <label
                      key={chat.id}
                      className="flex items-center px-4 py-3 hover:bg-[#F5F6F6] cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={newGroupForm.members.includes(chat.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewGroupForm(prev => ({ ...prev, members: [...prev.members, chat.id] }));
                          } else {
                            setNewGroupForm(prev => ({ ...prev, members: prev.members.filter(id => id !== chat.id) }));
                          }
                        }}
                        className="mr-3 w-4 h-4"
                      />
                      <img
                        src={chat.avatar}
                        alt={chat.name}
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                      <span className="text-[#111B21]">{chat.name}</span>
                    </label>
                  ))}
                </div>
                <p className="text-sm text-[#667781] mt-2">{newGroupForm.members.length} members selected</p>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowNewGroupModal(false)}
                  className="px-6 py-2 rounded-lg text-[#111B21] hover:bg-gray-100 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateGroup}
                  disabled={!newGroupForm.name.trim() || newGroupForm.members.length === 0}
                  className="px-6 py-2 rounded-lg bg-[#00A884] text-white hover:bg-[#008F6D] font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Create Group
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showNewCommunityModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-[480px] overflow-hidden">
            <div className="bg-[#008069] text-white px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-medium">New Community</h2>
              <button
                onClick={() => setShowNewCommunityModal(false)}
                className="text-white hover:bg-white/20 p-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#111B21] mb-2">Community Name</label>
                <input
                  type="text"
                  value={newCommunityForm.name}
                  onChange={(e) => setNewCommunityForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter community name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-[#111B21] outline-none focus:border-[#00A884]"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[#111B21] mb-2">Description</label>
                <textarea
                  value={newCommunityForm.description}
                  onChange={(e) => setNewCommunityForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter community description"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-[#111B21] outline-none focus:border-[#00A884] resize-none"
                />
              </div>

              <div className="bg-[#FFF4E5] border-l-4 border-[#F59E0B] p-4 mb-6 rounded">
                <p className="text-sm text-[#92400E]">
                  Communities are a place for people to connect around shared interests. You can create multiple groups within a community.
                </p>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowNewCommunityModal(false)}
                  className="px-6 py-2 rounded-lg text-[#111B21] hover:bg-gray-100 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCommunity}
                  disabled={!newCommunityForm.name.trim()}
                  className="px-6 py-2 rounded-lg bg-[#00A884] text-white hover:bg-[#008F6D] font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Create Community
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-[400px] overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-medium text-[#111B21] mb-4">Delete contact?</h2>
              <p className="text-[#667781] mb-2">
                {contactToDelete?.name} will be deleted from your contacts.
              </p>
              <p className="text-[#667781] mb-6">
                Messages will remain in your chat.
              </p>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setContactToDelete(null);
                  }}
                  className="px-6 py-2 rounded-lg text-[#00A884] hover:bg-[#F0F2F5] font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteContact}
                  className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCreateStatusModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-[500px] overflow-hidden">
            <div className="bg-[#008069] text-white px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-medium">Create Status</h2>
              <button
                onClick={() => setShowCreateStatusModal(false)}
                className="text-white hover:bg-white/20 p-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#111B21] mb-2">Post Status As</label>
                <select
                  value={selectedContactForStatus}
                  onChange={(e) => setSelectedContactForStatus(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-[#111B21] outline-none focus:border-[#00A884]"
                >
                  <option value="me">My Status</option>
                  {chats.map((chat) => (
                    <option key={chat.id} value={chat.id}>{chat.name}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-[#111B21] mb-2">Status Type</label>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setStatusType('text')}
                    className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all ${
                      statusType === 'text'
                        ? 'border-[#00A884] bg-[#00A884]/10 text-[#00A884]'
                        : 'border-gray-300 text-[#667781] hover:border-[#00A884]/50'
                    }`}
                  >
                    Text Status
                  </button>
                  <button
                    onClick={() => setStatusType('image')}
                    className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all ${
                      statusType === 'image'
                        ? 'border-[#00A884] bg-[#00A884]/10 text-[#00A884]'
                        : 'border-gray-300 text-[#667781] hover:border-[#00A884]/50'
                    }`}
                  >
                    Image Status
                  </button>
                </div>
              </div>

              {statusType === 'text' && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#111B21] mb-2">Background Color</label>
                    <div className="flex space-x-2">
                      {['#075E54', '#128C7E', '#25D366', '#34B7F1', '#7C4DFF', '#E91E63', '#FF6B6B'].map((color) => (
                        <button
                          key={color}
                          onClick={() => setStatusBackgroundColor(color)}
                          className={`w-10 h-10 rounded-full border-2 transition-all ${
                            statusBackgroundColor === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#111B21] mb-2">Status Text</label>
                    <textarea
                      value={newStatusText}
                      onChange={(e) => setNewStatusText(e.target.value)}
                      placeholder="What's on your mind?"
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 text-[#111B21] outline-none focus:border-[#00A884] resize-none"
                    />
                  </div>

                  <div className="mb-6 rounded-lg p-4" style={{ backgroundColor: statusBackgroundColor }}>
                    <p className="text-white text-center text-lg font-medium">
                      {newStatusText || 'Preview your status here...'}
                    </p>
                  </div>
                </>
              )}

              {statusType === 'image' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#111B21] mb-2">Upload Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <p className="text-[#667781] mb-2">Click to upload an image</p>
                    <p className="text-xs text-[#667781]">PNG, JPG up to 10MB</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowCreateStatusModal(false)}
                  className="px-6 py-2 rounded-lg text-[#111B21] hover:bg-gray-100 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateStatus}
                  disabled={!newStatusText.trim() && statusType === 'text'}
                  className="px-6 py-2 rounded-lg bg-[#00A884] text-white hover:bg-[#008F6D] font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Post Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showForwardDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-[480px] max-h-[600px] overflow-hidden">
            <div className="bg-[#008069] text-white px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-medium">Forward message to...</h2>
              <button
                onClick={() => setShowForwardDialog(false)}
                className="text-white hover:bg-white/20 p-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              <div className="relative mb-4">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#54656F]" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#F0F2F5] text-[14px] text-[#111B21] placeholder-[#667781] outline-none"
                />
              </div>

              <div className="max-h-[400px] overflow-y-auto">
                {chats.map(chat => (
                  <div
                    key={chat.id}
                    onClick={() => {
                      handleForwardMessage(selectedMessages, [chat.id]);
                    }}
                    className="flex items-center px-2 py-3 cursor-pointer hover:bg-[#F5F6F6] rounded-lg"
                  >
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-3 flex-1">
                      <h3 className="text-[#111B21] font-medium">{chat.name}</h3>
                      <p className="text-[#667781] text-sm truncate">{chat.lastMessage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {viewingStatus && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="w-full h-full flex flex-col">
            <div className="absolute top-0 left-0 right-0 z-10 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      setViewingStatus(null);
                      setStatusProgress(0);
                      if (viewingStatus) {
                        setStatuses(prev => prev.map(s =>
                          s.id === viewingStatus.id ? { ...s, viewed: true } : s
                        ));
                      }
                    }}
                    className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <img
                    src={viewingStatus.avatar}
                    alt={viewingStatus.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white"
                  />
                  <div>
                    <h3 className="text-white font-medium">{viewingStatus.name}</h3>
                    <p className="text-white/80 text-sm">{viewingStatus.time}</p>
                  </div>
                </div>
                <button className="text-white hover:bg-white/20 p-2 rounded-full transition-colors">
                  <MoreVertical className="w-6 h-6" />
                </button>
              </div>
              <div className="mt-2 h-1 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-100"
                  style={{ width: `${statusProgress}%` }}
                />
              </div>
            </div>

            <div
              className="flex-1 flex items-center justify-center"
              style={{
                backgroundColor: viewingStatus.backgroundColor || '#075E54'
              }}
            >
              <div className="max-w-2xl px-8">
                <p className="text-white text-3xl font-medium text-center leading-relaxed">
                  {viewingStatus.content || 'No content'}
                </p>
              </div>
            </div>

            <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-4">
              <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full backdrop-blur-sm transition-colors">
                Reply
              </button>
              <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full backdrop-blur-sm transition-colors flex items-center space-x-2">
                <Forward className="w-5 h-5" />
                <span>Forward</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {showThemeSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowThemeSettings(false)}>
          <div className={`${darkMode ? 'bg-[#202C33]' : 'bg-white'} rounded-xl shadow-2xl w-[520px] overflow-hidden`} onClick={(e) => e.stopPropagation()}>
            <div className="bg-[#008069] text-white px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-medium">Chat Background & Theme</h2>
              <button
                onClick={() => setShowThemeSettings(false)}
                className="text-white hover:bg-white/20 p-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h3 className={`text-sm font-medium ${darkMode ? 'text-[#E9EDEF]' : 'text-[#111B21]'} mb-3`}>Background Themes</h3>
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(backgroundThemes).filter(([key]) => key !== 'custom').map(([key, theme]) => (
                    <button
                      key={key}
                      onClick={() => setChatBackground(key)}
                      className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all ${
                        chatBackground === key ? 'border-[#00A884] ring-2 ring-[#00A884]/30' : darkMode ? 'border-[#3B4A54]' : 'border-gray-300'
                      }`}
                      style={{
                        background: theme.image,
                        backgroundColor: theme.color
                      }}
                    >
                      <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors" />
                      <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-medium capitalize bg-black/60 rounded px-2 py-1">
                        {key}
                      </div>
                      {chatBackground === key && (
                        <div className="absolute top-2 right-2 bg-[#00A884] rounded-full p-1">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className={`text-sm font-medium ${darkMode ? 'text-[#E9EDEF]' : 'text-[#111B21]'} mb-3`}>Custom Background</h3>
                <input
                  type="file"
                  ref={backgroundInputRef}
                  onChange={handleBackgroundUpload}
                  accept="image/*"
                  className="hidden"
                />
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => backgroundInputRef.current?.click()}
                    className={`flex-1 ${darkMode ? 'bg-[#2A3942] text-[#E9EDEF] hover:bg-[#3B4A54]' : 'bg-[#F0F2F5] text-[#111B21] hover:bg-[#E8EAED]'} px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Upload Image</span>
                  </button>
                  {customBackground && (
                    <button
                      onClick={() => {
                        setCustomBackground(null);
                        if (chatBackground === 'custom') setChatBackground('default');
                      }}
                      className="px-4 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 font-medium transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
                {customBackground && (
                  <div className="mt-3">
                    <button
                      onClick={() => setChatBackground('custom')}
                      className={`relative w-full h-32 rounded-lg overflow-hidden border-2 transition-all ${
                        chatBackground === 'custom' ? 'border-[#00A884] ring-2 ring-[#00A884]/30' : darkMode ? 'border-[#3B4A54]' : 'border-gray-300'
                      }`}
                      style={{
                        backgroundImage: `url(${customBackground})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      {chatBackground === 'custom' && (
                        <div className="absolute top-2 right-2 bg-[#00A884] rounded-full p-1">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>
                  </div>
                )}
              </div>

              <div className={`${darkMode ? 'bg-[#2A3942]' : 'bg-[#FFF4E5]'} border-l-4 ${darkMode ? 'border-[#00A884]' : 'border-[#F59E0B]'} p-4 rounded`}>
                <p className={`text-sm ${darkMode ? 'text-[#E9EDEF]' : 'text-[#92400E]'}`}>
                  Choose a background theme for your chat or upload your own custom image. Your preference will be saved automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppClone;
