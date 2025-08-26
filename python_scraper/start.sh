#!/bin/bash

echo "🚀 Starting Social Media Scraper Service..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 is not installed. Please install pip3 first."
    exit 1
fi

echo "📦 Installing dependencies..."
pip3 install -r requirements.txt

echo "🔧 Starting API server..."
python3 api_server.py
