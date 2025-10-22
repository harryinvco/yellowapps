#!/bin/bash

# WhatsApp Pharmacy Bot - Quick Start Script
echo "🏥 WhatsApp Pharmacy Bot - Starting..."
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  No .env file found!"
    echo ""
    echo "Creating .env from template..."
    cp .env.example .env
    echo ""
    echo "📝 Please edit .env and add your OpenAI API key:"
    echo "   OPENAI_API_KEY=your_actual_key_here"
    echo ""
    echo "Get your API key from: https://platform.openai.com/api-keys"
    echo ""
    read -p "Press Enter after you've added your API key (or press Ctrl+C to exit)..."
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

echo "🚀 Starting server..."
echo ""
echo "💡 Open your browser to: http://localhost:3000"
echo "📱 For mobile testing, use: http://$(hostname -I | awk '{print $1}'):3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm start
