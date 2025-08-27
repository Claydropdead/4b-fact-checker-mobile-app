import React from 'react';
import { 
  StyleSheet, 
  View, 
  StatusBar
} from 'react-native';
import { WebView } from 'react-native-webview';

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>4B Fact Checker</title>
    <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif;
            background: #ffffff;
            color: #1a1a1a;
            line-height: 1.6;
        }
        h1, h2, h3, .header-title, .page-title {
            font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif;
            font-weight: 700;
            letter-spacing: 0.5px;
            color: #0d47a1;
        }
        .header-bar {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            background: #ffffff; /* flat white */
            color: #0d47a1;
            padding: 14px 18px;
            border-bottom: 1px solid #e6eef9;
        }
        .header-logo {
            height: 48px;
            width: 48px;
            object-fit: contain;
            margin-right: 14px;
            border-radius: 10px;
            background: transparent;
        }
        .header-title {
            font-size: 1.25rem;
            font-weight: 800;
            color: #0d47a1;
            letter-spacing: 0.6px;
        }
        .page-header {
            display: flex;
            justify-content: center;
            align-items: center;
            background: transparent;
            padding: 20px 12px 6px 12px;
            margin-bottom: 18px;
            text-align: center;
        }
        .page-title {
            font-size: 1.25rem;
            margin: 0 auto 6px auto;
            max-width: 680px;
            line-height: 1.25;
            color: #102a43;
        }
        .page-subtitle {
            font-size: 0.98rem;
            color: #4b6274;
            font-weight: 500;
            margin: 0 auto;
            max-width: 760px;
            line-height: 1.45;
        }
        /* mission card */
        .mission-card {
            display: block;
            max-width: 820px;
            margin: 6px auto 18px auto;
            padding: 18px 18px 22px 18px;
            border-radius: 10px;
            background: #ffffff; /* flat card */
            border: 1px solid rgba(16,42,67,0.06);
        }
    /* header quick-input removed per user request */
        .quick-link-card {
            border-radius: 10px;
            padding: 18px;
            background: #ffffff;
            color: #0d47a1;
            font-weight: 600;
            font-size: 1rem;
            transition: transform 0.12s;
            border: 1px solid rgba(13,71,161,0.06);
        }
        .quick-link-card:hover {
            transform: translateY(-2px);
        }
        .quick-link-icon {
            font-size: 1.6rem;
            margin-bottom: 8px;
            background: transparent; /* ensure icon container has no solid background */
            color: #0d47a1;
        }
        /* ensure SVG icons inherit color and remain transparent */
        .quick-link-icon svg, .icon svg, .header-logo svg {
            fill: currentColor;
            background: transparent;
        }
        .accept-button {
            background: #0d47a1;
            color: #fff;
            font-weight: 700;
            border-radius: 8px;
            border: none;
            padding: 10px 12px;
            font-size: 1rem;
            margin-top: 12px;
        }
        .notice-modal {
            border-radius: 10px;
            background: #fff;
            border: 1px solid rgba(13,71,161,0.06);
        }
        .notice-header {
            text-align: left;
            background: transparent;
            color: #0d47a1;
            padding: 18px 18px 10px 18px;
        }
        .notice-title {
            font-size: 1.2rem;
            font-weight: 700;
            color: #102a43;
        }
        .notice-subtitle {
            font-size: 1rem;
            font-weight: 600;
            color: #324a5f;
        }
        .footer {
            background: transparent;
            color: #6b7c93;
            text-align: center;
            padding: 12px 0;
            font-size: 0.95rem;
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 100;
            font-weight: 500;
        }
        
        .container {
            max-width: 100%;
            margin: 0 auto;
            padding: 20px;
            min-height: 100vh;
        }
        
        .mobile-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: #ffffff;
            border-top: 1px solid rgba(16,42,67,0.08);
            display: flex;
            justify-content: space-around;
            padding: 10px 6px;
            z-index: 1000;
        }

        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 8px 12px;
            cursor: pointer;
            transition: all 0.2s ease;
            border-radius: 10px;
            min-width: 72px;
            position: relative;
            margin: 0 4px;
            color: #666;
        }

        .nav-icon {
            font-size: 24px;
            margin-bottom: 4px;
            color: inherit;
        }

        .nav-label {
            font-size: 12px;
            font-weight: 500;
            color: inherit;
        }

        .nav-item.active {
            background: rgba(33,150,243,0.08);
            color: #2196F3;
        }

        .nav-item:hover {
            background: rgba(0,0,0,0.04);
            transform: translateY(-1px);
        }
            transform: translateY(-2px);
            background: rgba(16,42,67,0.03);
            border-color: rgba(16,42,67,0.06);
        }

        .nav-item.active {
            background: #ffffff;
            color: #1976d2;
            border: 1px solid rgba(25,118,210,0.12);
            box-shadow: none;
        }

        .nav-icon {
            font-size: 22px;
            margin-bottom: 4px;
            color: rgba(16,42,67,0.65);
            filter: grayscale(100%);
            background: transparent; /* icon itself remains transparent */
            display: inline-block;
        }

        .nav-item.active .nav-icon {
            filter: grayscale(0%);
            color: #1976d2;
        }

        .nav-label {
            font-size: 11px;
            font-weight: 600;
            color: inherit;
        }
        
        .main-content {
            padding-bottom: 80px; /* Space for mobile nav */
        }
        
        .page-header {
            text-align: center;
            margin-bottom: 30px;
            padding-top: 10px;
        }
        
        .page-title {
            font-size: 24px;
            font-weight: bold;
            color: #2196F3;
            margin-bottom: 8px;
        }
        
        .page-subtitle {
            font-size: 14px;
            color: #666;
        }
        
        .quick-links-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-bottom: 30px;
        }
        
        .quick-link-card {
            background: #ffffff;
            color: #102a43;
            border-radius: 12px;
            padding: 16px;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
            border: 1px solid rgba(16,42,67,0.08);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
        }

        .quick-link-card:hover {
            transform: translateY(-2px);
            border-color: rgba(25,118,210,0.2);
            background: rgba(25,118,210,0.02);
        }

        .quick-link-icon {
            font-size: 32px;
            color: #1976d2;
            background: rgba(25,118,210,0.08);
            width: 56px;
            height: 56px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
        }
        
        .quick-link-title {
            font-size: 15px;
            font-weight: 600;
            color: #102a43;
            margin: 4px 0;
        }
        
        .quick-link-desc {
            font-size: 12px;
            color: #666;
            line-height: 1.4;
        }
        
        .categories-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .category-card {
            background: transparent;
            border-radius: 12px;
            padding: 18px;
            cursor: pointer;
            transition: transform 0.12s ease, border-color 0.12s ease;
            border: 1px solid rgba(16,42,67,0.08);
        }

        .category-card:hover {
            transform: translateY(-3px);
            border-color: rgba(16,42,67,0.12);
        }

        .category-card.selected {
            border-color: rgba(33,150,243,0.9);
            background: transparent;
        }
        
        .category-icon {
            font-size: 44px;
            margin-bottom: 12px;
            display: block;
            text-align: center;
            color: rgba(16,42,67,0.6);
            filter: grayscale(100%);
            background: transparent;
        }
        
        .category-title {
            font-size: 18px;
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
            text-align: center;
        }
        
        .category-description {
            font-size: 14px;
            color: #666;
            text-align: center;
            line-height: 1.5;
        }
        
        .category-examples {
            font-size: 12px;
            color: #888;
            margin-top: 10px;
            font-style: italic;
        }
        
        .page-container {
            display: none;
        }
        
        .page-container.active {
            display: block;
        }
        
        .back-button {
            background: transparent;
            border: 1px solid rgba(16,42,67,0.06);
            padding: 8px 16px;
            border-radius: 18px;
            cursor: pointer;
            font-size: 14px;
            margin-bottom: 20px;
            color: #334e68;
        }

        .back-button:hover {
            background: rgba(16,42,67,0.02);
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .title {
            font-size: 28px;
            font-weight: bold;
            color: #2196F3;
            margin-bottom: 10px;
        }
        
        .subtitle {
            font-size: 16px;
            color: #666;
        }
        
        .input-container {
            background: transparent;
            border-radius: 12px;
            padding: 18px;
            margin-bottom: 20px;
            border: 1px solid rgba(16,42,67,0.04);
        }
        
        .input-label {
            font-size: 16px;
            font-weight: 600;
            color: #333;
            margin-bottom: 12px;
        }
        
        .claim-input {
            width: 100%;
            min-height: 120px;
            border: 1px solid rgba(16,42,67,0.06);
            border-radius: 8px;
            padding: 14px;
            font-size: 16px;
            background-color: transparent;
            resize: vertical;
            font-family: inherit;
        }
        
        .note {
            font-size: 14px;
            color: #666;
            font-style: italic;
            margin-top: 10px;
        }
        
        .submit-button {
            width: 100%;
            background: #8E9AAF;
            border: none;
            border-radius: 25px;
            padding: 16px;
            color: white;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            margin-bottom: 30px;
        }
        
        .submit-button:disabled {
            background: #ccc;
            cursor: not-allowed;
        }
        
        .loader-container {
            text-align: center;
            padding: 40px 0;
        }
        
        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #2196F3;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 16px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .error-message {
            background: #ffebee;
            border-left: 4px solid #f44336;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
            color: #d32f2f;
        }
        
        .results-container {
            background: transparent;
            border-radius: 12px;
            margin-bottom: 30px;
            overflow: hidden;
            border: 1px solid rgba(16,42,67,0.04);
        }
        
        .verdict {
            padding: 20px;
            text-align: center;
            color: white;
            font-size: 18px;
            font-weight: bold;
        }
        
    .verdict.TRUE { background: rgba(76,175,80,0.06); color: #2e7d32; border: 1px solid rgba(76,175,80,0.18); }
    .verdict.FALSE { background: rgba(244,67,54,0.06); color: #b71c1c; border: 1px solid rgba(244,67,54,0.16); }
    .verdict.MISLEADING { background: rgba(255,152,0,0.06); color: #e65100; border: 1px solid rgba(255,152,0,0.14); }
    .verdict.CANNOT.VERIFY { background: rgba(158,158,158,0.06); color: #424242; border: 1px solid rgba(158,158,158,0.14); }
        
        .result-section {
            padding: 20px;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .result-section:last-child {
            border-bottom: none;
        }
        
        .result-section h2 {
            font-size: 16px;
            font-weight: bold;
            color: #333;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .original-claim {
            font-style: italic;
            color: #555;
            line-height: 1.5;
        }
        
        .sources-description {
            font-size: 14px;
            color: #666;
            font-style: italic;
            margin-bottom: 16px;
        }
        
        .source-type-badge {
            background: transparent;
            color: #1976d2;
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            margin-left: 10px;
            border: 1px solid rgba(25,118,210,0.08);
        }
        
        .credibility-score {
            display: inline-block;
            background: transparent;
            color: #2e7d32;
            padding: 4px 10px;
            border-radius: 14px;
            font-size: 12px;
            font-weight: 700;
            margin-left: 10px;
            border: 1px solid rgba(46,125,50,0.12);
        }

        .credibility-score.low {
            color: #b71c1c;
            border-color: rgba(183,28,28,0.12);
        }

        .credibility-score.medium {
            color: #ef6c00;
            border-color: rgba(239,108,0,0.12);
        }
        
        .bias-indicator {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 12px;
            font-size: 10px;
            margin-left: 5px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .bias-left {
            background: transparent;
            color: #1976d2;
            border: 1px solid rgba(33,150,243,0.12);
        }
        
        .bias-right {
            background: transparent;
            color: #c2185b;
            border: 1px solid rgba(194,18,91,0.12);
        }
        
        .publication-date {
            font-size: 11px;
            color: #888;
            margin-top: 5px;
        }
        
        .author-info {
            font-size: 12px;
            color: #666;
            margin-top: 5px;
        }
        
        .cross-reference {
            background: #fff3e0;
            border-left: 3px solid #ff9800;
            padding: 10px;
            margin-top: 10px;
            border-radius: 0 8px 8px 0;
        }
        
        .about-content {
            background: transparent;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
            border: 1px solid rgba(16,42,67,0.04);
        }
        
        .about-section {
            margin-bottom: 25px;
        }
        
        .about-section h3 {
            font-size: 18px;
            font-weight: bold;
            color: #2196F3;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }
        
        .about-section h3 span {
            margin-right: 10px;
            font-size: 24px;
        }
        
        .about-section p {
            color: #555;
            line-height: 1.6;
            margin-bottom: 10px;
        }
        
        .feature-list {
            list-style: none;
            padding: 0;
        }
        
        .feature-list li {
            padding: 8px 0;
            color: #555;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .feature-list li:last-child {
            border-bottom: none;
        }
        
        .feature-list li::before {
            content: "✓";
            color: #4caf50;
            font-weight: bold;
            margin-right: 10px;
        }
        
        .app-info {
            background: transparent;
            color: #102a43;
            text-align: center;
            padding: 18px;
            border-radius: 12px;
            margin-bottom: 20px;
            border: 1px solid rgba(16,42,67,0.06);
        }
        
        .version-info {
            background: transparent;
            border-radius: 12px;
            padding: 12px;
            text-align: center;
            color: #666;
            font-size: 12px;
            border: 1px solid rgba(16,42,67,0.04);
        }
        
        .selected-category-badge {
            background: transparent;
            color: #1976d2;
            padding: 5px 12px;
            border-radius: 18px;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 15px;
            display: inline-block;
            border: 1px solid rgba(25,118,210,0.12);
        }
        
        .sources-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .sources-list li {
            background: transparent;
            border-radius: 10px;
            margin-bottom: 12px;
            padding: 14px;
            border-left: 4px solid rgba(224,224,224,0.7);
            transition: transform 0.12s ease, box-shadow 0.12s ease;
        }
        
        .sources-list li:hover {
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            transform: translateY(-2px);
        }
        
        .sources-list li.trusted-source {
            border-left-color: rgba(76,175,80,0.9);
            background: transparent;
        }
        
        .source-title-container {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 8px;
            margin-bottom: 12px;
        }
        
        .source-title-container a {
            color: #2196F3;
            text-decoration: none;
            font-weight: 600;
            font-size: 15px;
            line-height: 1.4;
            flex: 1;
            min-width: 200px;
        }
        
        .source-title-container a:hover {
            text-decoration: underline;
            color: #1976d2;
        }
        
        .source-type-badge {
            background: #6070d8;
            color: white;
            padding: 4px 12px;
            border-radius: 15px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .trusted-badge {
            background: transparent;
            color: #2e7d32;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            border: 1px solid rgba(46,125,50,0.12);
        }
        
        .source-uri {
            color: #666;
            font-size: 13px;
            font-weight: 500;
            display: flex;
            align-items: center;
            margin-bottom: 8px;
        }
        
        .source-uri::before {
            content: "Website: ";
            margin-right: 6px;
            font-size: 12px;
            font-weight: 600;
        }
        
        .publication-date {
            font-size: 12px;
            color: #888;
            display: flex;
            align-items: center;
            margin-bottom: 5px;
        }
        
        .publication-date::before {
            content: "Published: ";
            margin-right: 6px;
            font-size: 11px;
            font-weight: 600;
        }
        
        .author-info {
            font-size: 12px;
            color: #666;
            font-style: italic;
            display: flex;
            align-items: center;
        }
        
        .author-info::before {
            content: "By: ";
            margin-right: 6px;
            font-size: 11px;
            font-weight: 600;
        }
        
        .bias-indicator {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 12px;
            font-size: 10px;
            margin-left: 5px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .bias-left {
            background: #eaf6ff;
            color: #1976d2;
            border: 1px solid #2196f3;
        }
        
        .bias-right {
            background: #fff1f6;
            color: #c2185b;
            border: 1px solid #e91e63;
        }
        
        .sources-summary {
            background: transparent;
            border-radius: 12px;
            padding: 14px;
            margin-bottom: 20px;
            text-align: center;
            border: 1px solid rgba(16,42,67,0.04);
        }
        
        .sources-stats {
            display: flex;
            justify-content: space-around;
            margin-top: 10px;
        }
        
        .stat-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 12px;
        }
        
        .stat-number {
            font-size: 18px;
            font-weight: bold;
            color: #2196F3;
        }
        
        .stat-label {
            color: #666;
            margin-top: 2px;
        }
        
        .notice-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            padding: 20px;
        }
        
        .notice-modal {
            background: white;
            border-radius: 20px;
            max-width: 500px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            animation: modalSlideIn 0.3s ease-out;
        }
        
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(50px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        .notice-header {
            background: #6070d8;
            color: white;
            padding: 25px;
            border-radius: 20px 20px 0 0;
            text-align: center;
        }
        
        .notice-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 8px;
        }
        
        .notice-subtitle {
            font-size: 14px;
            opacity: 0.9;
        }
        
        .notice-content {
            padding: 25px;
        }
        
        .notice-section {
            margin-bottom: 20px;
        }
        
        .notice-section h3 {
            font-size: 16px;
            font-weight: bold;
            color: #2196F3;
            margin-bottom: 10px;
        }
        
        .notice-section p, .notice-section li {
            font-size: 14px;
            line-height: 1.6;
            color: #555;
            margin-bottom: 8px;
        }
        
        .notice-section ul {
            padding-left: 20px;
            margin-bottom: 10px;
        }
        
        .important-warning {
            background: #fff4e6;
            border-left: 4px solid #ff9800;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
        }
        
        .important-warning p {
            color: #e65100;
            font-weight: 500;
            margin: 0;
        }
        
        .notice-footer {
            padding: 20px 25px 25px;
            border-top: 1px solid #eee;
        }
        
        .checkbox-container {
            display: flex;
            align-items: flex-start;
            margin-bottom: 20px;
            cursor: pointer;
        }
        
        .checkbox-container input[type="checkbox"] {
            margin-right: 12px;
            margin-top: 4px;
            transform: scale(1.2);
        }
        
        .checkbox-label {
            font-size: 14px;
            color: #333;
            line-height: 1.5;
        }
        
        .accept-button {
            width: 100%;
            background: #4caf50;
            color: white;
            border: none;
            padding: 15px;
            border-radius: 12px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .accept-button:disabled {
            background: #ccc;
            cursor: not-allowed;
            transform: none;
        }
        
        .accept-button:enabled:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(76, 175, 80, 0.3);
        }
            margin-top: 4px;
        }
    </style>
    <script type="importmap">
    {
      "imports": {
        "@google/genai": "https://aistudiocdn.com/@google/genai@^1.15.0",
        "react-dom/": "https://aistudiocdn.com/react-dom@^19.1.1/",
        "react/": "https://aistudiocdn.com/react@^19.1.1/",
        "react": "https://aistudiocdn.com/react@^19.1.1"
      }
    }
    </script>
</head>
<body>
    <!-- Notice/Disclaimer Modal -->
    <div class="header-bar">
    <!-- use remote-hosted logo URL (user requested: use image URL only) -->
    <img id="header-logo-img" src="https://image2url.com/images/1756263972017-c7425169-af01-4859-b0e2-97c1e847050b.png" alt="PNP 4B FactChecker Logo" class="header-logo" />
    <span class="header-title">4B Fact Checker</span>
    </div>
    <div id="notice-overlay" class="notice-overlay">
        <div class="notice-modal">
            <div class="notice-header">
                <h1 class="notice-title" style="font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif; font-weight: 800; font-size: 2rem;">Important Notice</h1>
                <p class="notice-subtitle" style="font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif; font-size: 1.2rem; font-weight: 600;">Please read carefully before using 4B Fact Checker</p>
            </div>
            
            <div class="notice-content">
                <div class="notice-section">
                    <h3>AI-Powered Fact Checking</h3>
                    <p>This application uses artificial intelligence to help verify claims and information. While we strive for accuracy, AI-generated results should be considered as guidance rather than absolute truth.</p>
                </div>
                
                <div class="notice-section">
                    <h3>Your Responsibilities</h3>
                    <ul>
                        <li><strong>Critical Thinking:</strong> Always apply your own judgment and critical thinking skills</li>
                        <li><strong>Multiple Sources:</strong> Consider checking multiple reliable sources for important decisions</li>
                        <li><strong>Professional Advice:</strong> For medical, legal, or financial matters, consult qualified professionals</li>
                        <li><strong>Current Events:</strong> Information may become outdated; verify recent developments independently</li>
                    </ul>
                </div>
                
                <div class="important-warning">
                    <p><strong>Important:</strong> This app provides information for educational and research purposes. It should not replace professional advice, official sources, or your own critical analysis.</p>
                </div>
                
                <div class="notice-section">
                    <h3>How We Verify Information</h3>
                    <p>Our AI system consults trusted Philippine news sources, government websites, and established institutions. However, the interpretation and final judgment should always remain with you.</p>
                </div>
                
                <div class="notice-section">
                    <h3>Privacy & Usage</h3>
                    <ul>
                        <li>Your queries are processed to provide fact-checking services</li>
                        <li>We prioritize user privacy and data protection</li>
                        <li>The app requires internet connection to access current information</li>
                    </ul>
                </div>
                
                <div class="notice-section">
                    <h3>Philippine Context</h3>
                    <p>This fact-checker is specifically designed for Philippine news, claims, and cultural context. Results may be more accurate for local content and may have limitations for international topics.</p>
                </div>
            </div>
            
            <div class="notice-footer">
                <label class="checkbox-container">
                    <input type="checkbox" id="accept-terms" onchange="handleCheckboxChange(this)">
                    <span class="checkbox-label">
                        I have read and understood the above notice. I agree to use this application responsibly and understand that AI-generated results require my own critical evaluation.
                    </span>
                </label>
                
                <button id="accept-button" class="accept-button" disabled onclick="handleContinueClick()">
                    Continue to Fact-Checker
                </button>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="main-content">
            <!-- Home Page -->
            <div id="home-page" class="page-container active">
                <div class="page-header">
                    <div class="mission-card">
                        <h2 class="page-title">Combat Misinformation. Get the Facts, Fast.</h2>
                        <p class="page-subtitle">Paste a claim, a news link, or a social media post to get an instant, AI-driven fact-check based on trusted local sources.</p>
                    </div>
                    <!-- header quick input removed per user request -->
                </div>

                <div class="quick-links-grid">
                    <div class="quick-link-card" onclick="quickSelectCategory('political')">
                        <i class="ri-government-line quick-link-icon"></i>
                        <div class="quick-link-title">Political</div>
                        <div class="quick-link-desc">Government policies & claims</div>
                    </div>

                    <div class="quick-link-card" onclick="quickSelectCategory('health')">
                        <i class="ri-heart-pulse-line quick-link-icon"></i>
                        <div class="quick-link-title">Health</div>
                        <div class="quick-link-desc">Medical & health information</div>
                    </div>

                    <div class="quick-link-card" onclick="quickSelectCategory('economic')">
                        <i class="ri-stock-line quick-link-icon"></i>
                        <div class="quick-link-title">Economic</div>
                        <div class="quick-link-desc">Financial & market data</div>
                    </div>

                    <div class="quick-link-card" onclick="quickSelectCategory('historical')">
                        <i class="ri-book-2-line quick-link-icon"></i>
                        <div class="quick-link-title">Historical</div>
                        <div class="quick-link-desc">Historical events & facts</div>
                    </div>

                    <div class="quick-link-card" onclick="quickSelectCategory('entertainment')">
                        <i class="ri-film-line quick-link-icon"></i>
                        <div class="quick-link-title">Entertainment</div>
                        <div class="quick-link-desc">Celebrity & entertainment news</div>
                    </div>
                 </div>
            </div>

            <!-- Quick Check Page -->
            <div id="quick-check-page" class="page-container">
                <div class="page-header">
                    <h1 class="page-title">Quick Fact Check</h1>
                    <p class="page-subtitle">Verify any claim or URL instantly</p>
                </div>

                <div class="input-container">
                    <label class="input-label" for="claim-input">Enter text, URL, or social media link to fact-check</label>
                    <textarea
                        id="claim-input"
                        class="claim-input"
                        placeholder="e.g., Is it true that... OR paste a URL from a news article or YouTube video."
                        rows="5"
                    ></textarea>
                    <p class="note">
                        Note: For video links, the AI searches for transcripts and articles online. Fact-checking depends on publicly available text about the video.
                    </p>
                </div>

                <button id="submit-button" class="submit-button">Check Fact</button>
            </div>

            <!-- How to Use Page -->
            <div id="how-to-use-page" class="page-container">
                <div class="page-header">
                    <h1 class="page-title">How to Use</h1>
                    <p class="page-subtitle">Learn how to effectively use the 4B Fact Checker</p>
                </div>

                <div class="about-content">
                    <div class="about-section">
                        <h3><span class="inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12l18-9-9 18-2-8-7-1z"/></svg></span>Getting Started</h3>
                        <ol class="feature-list">
                            <li>Choose a category from the Home page or use Quick Check for general claims</li>
                            <li>Type or paste the claim you want to fact-check</li>
                            <li>Tap "Check Facts" to start the verification process</li>
                            <li>Wait for AI analysis and source verification</li>
                        </ol>
                    </div>

                    <div class="about-section">
                        <h3><span class="inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10H7z"/><path d="M9 9v6h6"/></svg></span>Best Practices for Claims</h3>
                        <ul class="feature-list">
                            <li><strong>Be specific:</strong> "President announced 20% budget increase for education" instead of "President said something about education"</li>
                            <li><strong>Include context:</strong> Add dates, locations, or specific numbers when possible</li>
                            <li><strong>Use clear language:</strong> Avoid slang or ambiguous terms</li>
                            <li><strong>Single claims:</strong> Check one claim at a time for better accuracy</li>
                        </ul>
                    </div>

                    <div class="about-section">
                        <h3><span class="inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18v12H3z"/></svg></span>Category Selection Guide</h3>
                        <ul class="feature-list">
                            <li><strong><span class="inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10l9-6 9 6"/><path d="M3 22h18"/></svg></span> Political:</strong> Government policies, election claims, political statements</li>
                            <li><strong><span class="inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/></svg></span> Health:</strong> Medical advice, health statistics, pandemic information</li>
                            <li><strong><span class="inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="7"/></svg></span> Economic:</strong> Financial data, market trends, economic policies</li>
                            <li><strong><span class="inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5h18v14H3z"/></svg></span> Historical:</strong> Past events, historical facts, dates and figures</li>
                            <li><strong><span class="inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7c1.5-2 4-2 5 0"/></svg></span> Entertainment:</strong> Celebrity news, showbiz rumors, entertainment facts</li>
                        </ul>
                    </div>

                    <div class="about-section">
                        <h3><span class="inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 13v4"/><path d="M12 9v8"/><path d="M17 5v12"/></svg></span>Understanding Results</h3>
                        <ul class="feature-list">
                            <li><strong>Verdict:</strong> Overall assessment (True, False, Partially True, etc.)</li>
                            <li><strong>Sources:</strong> List of verified sources used for fact-checking</li>
                            <li><strong>Analysis:</strong> Detailed explanation of findings</li>
                            <li><strong>Source Credibility:</strong> Assessment of source reliability</li>
                            <li><strong>Bias Detection:</strong> Information about potential media bias</li>
                        </ul>
                    </div>

                    <div class="about-section">
                        <h3><span class="inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94A2 2 0 0 0 22.18 18L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></span>Important Reminders</h3>
                        <ul class="feature-list">
                            <li>AI results should be used as a starting point, not the final word</li>
                            <li>Always cross-check with multiple sources for critical decisions</li>
                            <li>Information is based on available online sources at the time of checking</li>
                            <li>Be aware that new information may change the accuracy of older claims</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- About Page -->
            <div id="about-page" class="page-container">
                <div class="page-header">
                    <h1 class="page-title">About</h1>
                    <p class="page-subtitle">Learn more about our fact-checking system</p>
                </div>

                <div class="app-info">
                    <h2>4B Fact Checker</h2>
                    <p>Your trusted AI-powered companion for verifying news, claims, and information in the Philippines.</p>
                </div>

                <div class="about-content">
                    <div class="about-section">
                        <h3><span class="inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/></svg></span>AI-Powered Verification</h3>
                        <p>Our system uses Google's advanced Gemini 2.5 Flash AI model with real-time web search capabilities to verify claims against trusted Philippine sources.</p>
                    </div>

                    <div class="about-section">
                        <h3><span class="inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 13v4"/><path d="M12 9v8"/><path d="M17 5v12"/></svg></span>Source Analysis</h3>
                        <p>Each fact-check includes detailed source analysis with credibility scores, media bias detection, and publication date verification.</p>
                    </div>

                    <div class="about-section">
                        <h3><span class="inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18v12H3z"/></svg></span>Specialized Categories</h3>
                        <ul class="feature-list">
                            <li>Political claims and government policies</li>
                            <li>Health and medical information</li>
                            <li>Economic data and statistics</li>
                            <li>Historical events and facts</li>
                            <li>Celebrity and entertainment news</li>
                        </ul>
                    </div>

                    <div class="about-section">
                        <h3><span class="inline-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z"/></svg></span>Trusted Sources</h3>
                        <p>We prioritize established Philippine news outlets, government sources, and official institutions to ensure accuracy.</p>
                        <ul class="feature-list">
                            <li>Rappler, GMA Network, Philippine Star</li>
                            <li>Government websites (.gov.ph domains)</li>
                            <li>Academic and medical institutions</li>
                            <li>International news agencies</li>
                        </ul>
                    </div>
                </div>

                <div class="version-info">
                     Developed by Police Regional Office MIMAROPA | Est. 2025<br>
                     Powered by Google Gemini AI | Built with React Native
                 </div>
            </div>

            <!-- Category-specific fact checking page -->
            <div id="category-check-page" class="page-container">
                <button class="back-button" onclick="showPage('home')">← Back to Home</button>
                
                <div id="selected-category-info">
                    <span id="selected-category-badge" class="selected-category-badge"></span>
                    <div class="input-container">
                        <label class="input-label" for="category-claim-input">Enter your claim to fact-check</label>
                        <textarea
                            id="category-claim-input"
                            class="claim-input"
                            rows="5"
                        ></textarea>
                    </div>
                    <button id="category-submit-button" class="submit-button">Check Fact</button>
                </div>
            </div>

            <div id="loader-container" class="loader-container" style="display: none;">
                <div class="spinner"></div>
                <p id="loading-message">Analyzing your claim...</p>
            </div>

            <div id="error-message" class="error-message" style="display: none;"></div>

            <div id="results-container" class="results-container" style="display: none;">
                <div id="verdict" class="verdict"></div>
                
                <div class="result-section">
                    <h2>Original Claim</h2>
                    <p id="original-claim" class="original-claim"></p>
                </div>

                <div class="result-section">
                    <h2>Summary</h2>
                    <p id="summary"></p>
                </div>

                <div id="sources-section" class="result-section" style="display: none;">
                    <h2>Sources</h2>
                    <p class="sources-description">
                        The AI consulted the following web pages to arrive at its conclusion. These are the actual blog posts, news articles, or other online resources used for fact-checking.
                    </p>
                    <ul id="sources-list" class="sources-list"></ul>
                </div>
            </div>
        </div>

        <!-- Mobile Navigation -->
        <div class="mobile-nav">
            <div class="nav-item active" onclick="showPage('home')">
                <i class="ri-home-3-line nav-icon"></i>
                <span class="nav-label">Home</span>
            </div>
            
            <div class="nav-item" onclick="showPage('quick-check')">
                <i class="ri-flashlight-line nav-icon"></i>
                <span class="nav-label">Check</span>
            </div>

            <div class="nav-item" onclick="showPage('how-to-use')">
                <i class="ri-question-line nav-icon"></i>
                <span class="nav-label">Guide</span>
            </div>

            <div class="nav-item" onclick="showPage('about')">
                <i class="ri-information-line nav-icon"></i>
                <span class="nav-label">About</span>
            </div>
        </div>
    </div>    <script type="module">
        import { GoogleGenAI } from "@google/genai";

        const GEMINI_API_KEY = 'AIzaSyDXn8yKFclsgyHM7uFbZDeh7AZixlghgbg';
        
        let selectedCategory = null;
        let currentPage = 'home';
        let termsAccepted = false; // Use in-memory variable instead of localStorage

        // Handle checkbox change
        function handleCheckboxChange(checkbox) {
            var button = document.getElementById('accept-button');
            if (!button) {
                return;
            }
            
            if (checkbox.checked) {
                button.disabled = false;
                button.style.background = '#4caf50';
                button.style.cursor = 'pointer';
            } else {
                button.disabled = true;
                button.style.background = '#ccc';
                button.style.cursor = 'not-allowed';
            }
        }

        // Handle continue button click
        function handleContinueClick() {
            try {
                // Set in-memory flag instead of localStorage
                termsAccepted = true;
                
                // Try to hide modal
                var modal = document.getElementById('notice-overlay');
                if (modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                } else {
                }
                
                // Alternative: Remove modal completely
                setTimeout(function() {
                    if (modal && modal.parentNode) {
                        modal.parentNode.removeChild(modal);
                    }
                }, 100);
                
            } catch (error) {
                // Silent error handling
                console.log('Modal error:', error.message);
            }
        }

        // Make functions global
        window.handleCheckboxChange = handleCheckboxChange;
        window.handleContinueClick = handleContinueClick;

        // Initialize the app
        function initializeApp() {
            // Since localStorage is blocked, modal will always show on first load
            // This is actually better for user experience - they see the notice each session
        }

        // Navigation functions
        function showPage(pageName) {
            // Hide all pages
            document.querySelectorAll('.page-container').forEach(page => {
                page.classList.remove('active');
            });
            
            // Update mobile navigation
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Show selected page
            document.getElementById(pageName + '-page').classList.add('active');
            
            // Highlight active nav item
            const navItems = document.querySelectorAll('.nav-item');
            if (pageName === 'home') navItems[0].classList.add('active');
            else if (pageName === 'quick-check') navItems[1].classList.add('active');
            else if (pageName === 'how-to-use') navItems[2].classList.add('active');
            else if (pageName === 'about') navItems[3].classList.add('active');
            
            currentPage = pageName;
            
            // Reset forms and results when switching pages
            if (pageName === 'quick-check') {
                document.getElementById('claim-input').value = '';
                hideResults();
            } else if (pageName === 'home') {
                hideResults();
            }
        }

        function quickSelectCategory(category) {
            selectedCategory = category;
            
            // Set category-specific information
            const categoryInfo = {
                political: {
                    title: 'Political Claims Verification',
                    placeholder: 'Enter political claim, campaign promise, or government announcement...'
                },
                health: {
                    title: 'Health & Medical Information',
                    placeholder: 'Enter health claim, medical advice, or treatment information...'
                },
                economic: {
                    title: 'Economic Data Verification',
                    placeholder: 'Enter economic statistic, market data, or financial claim...'
                },
                historical: {
                    title: 'Historical Claims Verification',
                    placeholder: 'Enter historical event, date, or biographical claim...'
                },
                entertainment: {
                    title: 'Celebrity & Entertainment News',
                    placeholder: 'Enter celebrity news, entertainment claim, or industry information...'
                }
            };
            
            const info = categoryInfo[category];
            document.getElementById('selected-category-badge').textContent = info.title;
            document.getElementById('category-claim-input').placeholder = info.placeholder;
            document.getElementById('category-claim-input').value = '';
            
            // Show category check page
            showPage('category-check');
        }

        function selectCategory(category) {
            selectedCategory = category;
            
            // Update category cards visual state
            document.querySelectorAll('.category-card').forEach(card => {
                card.classList.remove('selected');
            });
            event.target.closest('.category-card').classList.add('selected');
            
            quickSelectCategory(category);
        }

        function hideResults() {
            document.getElementById('results-container').style.display = 'none';
            document.getElementById('error-message').style.display = 'none';
            document.getElementById('loader-container').style.display = 'none';
        }

        // Make functions globally available
        window.showPage = showPage;
        window.selectCategory = selectCategory;
        window.quickSelectCategory = quickSelectCategory;

    /* header quick-check helper removed per user request */

        // Enhanced source analysis functions
        function getSourceCredibilityScore(hostname, sourceType, isTrusted) {
            let score = 50; // Base score
            
            // Boost for trusted sources
            if (isTrusted) score += 30;
            
            // Adjust based on source type
            switch (sourceType) {
                case 'News': score += 20; break;
                case 'Government': score += 25; break;
                case 'Academic': score += 30; break;
                case 'Medical': score += 25; break;
                case 'Social Media': score -= 20; break;
                case 'Blog': score -= 10; break;
                case 'Forum': score -= 15; break;
                default: break;
            }
            
            // Domain-specific adjustments
            const highCredibilityDomains = ['who.int', 'cdc.gov', 'nih.gov', 'pna.gov.ph', 'doh.gov.ph'];
            const mediumCredibilityDomains = ['wikipedia.org', 'reuters.com', 'ap.org'];
            
            if (highCredibilityDomains.some(domain => hostname.includes(domain))) {
                score += 20;
            } else if (mediumCredibilityDomains.some(domain => hostname.includes(domain))) {
                score += 10;
            }
            
            return Math.min(Math.max(score, 0), 100);
        }

        function getMediaBias(hostname) {
            const biasMap = {
                'rappler.com': 'center',
                'philstar.com': 'center',
                'gmanetwork.com': 'center',
                'abs-cbn.com': 'left',
                'inquirer.net': 'center',
                'sunstar.com.ph': 'right',
                'mb.com.ph': 'right',
                'cnn.com': 'left',
                'foxnews.com': 'right',
                'bbc.com': 'center',
                'reuters.com': 'center'
            };
            
            return biasMap[hostname] || 'center';
        }

        function formatPublicationDate(dateString) {
            if (!dateString) return null;
            try {
                const date = new Date(dateString);
                const now = new Date();
                const diffTime = Math.abs(now - date);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                if (diffDays === 1) return 'Published yesterday';
                if (diffDays < 7) return \`Published \${diffDays} days ago\`;
                if (diffDays < 30) return \`Published \${Math.ceil(diffDays / 7)} weeks ago\`;
                if (diffDays < 365) return \`Published \${Math.ceil(diffDays / 30)} months ago\`;
                return \`Published \${Math.ceil(diffDays / 365)} years ago\`;
            } catch (e) {
                return dateString;
            }
        }

        function getCategorySpecificPrompt(category, claim) {
            const prompts = {
                political: \`You are fact-checking a POLITICAL CLAIM in the Philippines. Focus on:
- Government policies and their actual implementation
- Political promises vs. actual delivery
- Election-related information accuracy  
- Government statistics and official statements
- Political scandals and their veracity
Pay special attention to official government sources (.gov.ph domains) and established political news outlets.\`,

                health: \`You are fact-checking a HEALTH/MEDICAL CLAIM in the Philippines. Focus on:
- Medical accuracy based on scientific evidence
- Public health information from DOH and WHO
- Treatment effectiveness and safety
- Vaccine information and safety data
- Health statistics and disease prevalence
Prioritize medical journals, health authorities (DOH, WHO, CDC), and licensed medical institutions.\`,

                economic: \`You are fact-checking an ECONOMIC CLAIM about the Philippines. Focus on:
- Official economic statistics (PSA, BSP, NEDA)
- Market data accuracy
- Employment and inflation figures
- GDP and economic growth data
- Business and investment claims
Prioritize government statistical agencies, central bank data, and reputable financial news sources.\`,

                historical: \`You are fact-checking a HISTORICAL CLAIM about the Philippines. Focus on:
- Historical accuracy of events and dates
- Biographical information verification
- Cultural and historical context
- Official historical records
- Archaeological and documented evidence
Prioritize academic sources, historical societies, museums, and peer-reviewed historical publications.\`,

                entertainment: \`You are fact-checking CELEBRITY/ENTERTAINMENT NEWS in the Philippines. Focus on:
- Celebrity relationship and personal life claims
- Entertainment industry information
- Awards and achievements verification
- Movie/TV show production facts
- Social media celebrity claims
Cross-reference with official entertainment news outlets, celebrity social media, and industry publications.\`
            };

            return prompts[category] || '';
        }
        
        const TRUSTED_SOURCES = [
            'rappler.com',
            'philstar.com',
            'gmanetwork.com',
            'news.abs-cbn.com',
            'inquirer.net',
            'bworldonline.com',
            'sunstar.com.ph',
            'manilatimes.net',
            'pna.gov.ph',
        ];

        const loadingMessages = [
            "Analyzing your claim...",
            "Cross-referencing with trusted sources...",
            "Searching for supporting evidence...",
            "Compiling the final verdict...",
            "Just a moment more..."
        ];

        let loadingInterval;

        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

        const parseResponse = (responseText) => {
            const verdictMatch = responseText.match(/^VERDICT:\\s*(TRUE|FALSE|MISLEADING|CANNOT VERIFY)/);
            const summaryMatch = responseText.match(/SUMMARY:\\s*([\\s\\S]*)/);

            const verdict = (verdictMatch ? verdictMatch[1].trim() : "CANNOT VERIFY");
            const summary = summaryMatch ? summaryMatch[1].trim() : "The model did not provide a summary.";

            return { verdict, summary };
        };

        const getSourceType = (uri, isTrusted) => {
            try {
                const url = new URL(uri);
                const hostname = url.hostname;
                const pathname = url.pathname;
                
                if (hostname.includes('youtube.com') || hostname.includes('youtu.be') || hostname.includes('vimeo.com')) {
                    return 'Video';
                }
                if (isTrusted) {
                    return 'News Article';
                }
                if (hostname.endsWith('.gov.ph') || hostname.endsWith('.gov')) {
                    return 'Government Site';
                }
                if (hostname.includes('facebook.com') || hostname.includes('twitter.com') || hostname.includes('reddit.com')) {
                    return 'Social Media';
                }
                if (pathname.match(/\\/\\d{4}\\/\\d{2}\\/\\d{2}\\//) || pathname.includes('/news/') || pathname.includes('/article/')) {
                    return 'News Article';
                }
                if (pathname.includes('/blog/') || hostname.includes('blogspot.com') || hostname.includes('wordpress.com') || hostname.includes('medium.com')) {
                    return 'Blog Post';
                }
                if (hostname.includes('forum.')) {
                    return 'Forum';
                }
                if (pathname.endsWith('.pdf')) {
                    return 'Document';
                }
                if (['news', 'daily', 'journal', 'times', 'post', 'chronicle', 'tribune', 'herald'].some(keyword => hostname.includes(keyword))) {
                    return 'News Source';
                }
            
                return 'Website';
            } catch (e) {
                return 'Website';
            }
        };

        const normalizeTitle = (title) => {
            return title.toLowerCase().replace(/[^a-z0-9]/g, '').trim();
        };

        const startLoading = () => {
            const loaderContainer = document.getElementById('loader-container');
            const loadingMessage = document.getElementById('loading-message');
            
            loaderContainer.style.display = 'block';
            loadingMessage.textContent = loadingMessages[0];
            
            let i = 1;
            loadingInterval = setInterval(() => {
                loadingMessage.textContent = loadingMessages[i % loadingMessages.length];
                i++;
            }, 3000);
        };

        const stopLoading = () => {
            document.getElementById('loader-container').style.display = 'none';
            if (loadingInterval) {
                clearInterval(loadingInterval);
            }
        };

        const showError = (message) => {
            const errorElement = document.getElementById('error-message');
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        };

        const hideError = () => {
            document.getElementById('error-message').style.display = 'none';
        };

        const displayResults = (result) => {
            // Show verdict
            const verdictElement = document.getElementById('verdict');
            verdictElement.textContent = \`VERDICT: \${result.verdict}\`;
            verdictElement.className = \`verdict \${result.verdict.replace(' ', '.')}\`;

            // Show original claim
            document.getElementById('original-claim').textContent = result.claim;

            // Show summary
            document.getElementById('summary').textContent = result.summary;

            // Show sources with enhanced analysis
            if (result.sources && result.sources.length > 0) {
                const sourcesSection = document.getElementById('sources-section');
                const sourcesList = document.getElementById('sources-list');
                
                sourcesList.innerHTML = '';
                
                // Add sources summary
                const trustedCount = result.sources.filter(s => s.isTrusted).length;
                const totalCount = result.sources.length;
                
                const summaryDiv = document.createElement('div');
                summaryDiv.className = 'sources-summary';
                summaryDiv.innerHTML = \`
                    <div style="font-size: 14px; font-weight: 600; color: #333; margin-bottom: 8px;">
                        Sources Analysis Summary
                    </div>
                    <div class="sources-stats">
                        <div class="stat-item">
                            <div class="stat-number">\${totalCount}</div>
                            <div class="stat-label">Total Sources</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">\${trustedCount}</div>
                            <div class="stat-label">Trusted Sources</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">\${Math.round((trustedCount / totalCount) * 100)}%</div>
                            <div class="stat-label">Trust Score</div>
                        </div>
                    </div>
                \`;
                
                sourcesList.appendChild(summaryDiv);
                
                result.sources.forEach(source => {
                    const li = document.createElement('li');
                    
                    let hostname = '';
                    try {
                        hostname = new URL(source.uri).hostname.replace(/^www\\./, '');
                    } catch (e) {
                        console.warn(\`Invalid source URL: \${source.uri}\`);
                        hostname = 'unknown';
                    }
                    
                    // Add trusted source class
                    if (source.isTrusted) {
                        li.classList.add('trusted-source');
                    }
                    
                    // Get enhanced source analysis
                    const mediasBias = getMediaBias(hostname);
                    const publicationDate = source.publicationDate ? formatPublicationDate(source.publicationDate) : null;
                    
                    // Only show bias if it's not center
                    const biasIndicator = mediasBias !== 'center' ? 
                        \`<span class="bias-indicator bias-\${mediasBias}">\${mediasBias.toUpperCase()}</span>\` : '';
                    
                    li.innerHTML = \`
                        <div class="source-title-container">
                            <a href="\${source.uri}" target="_blank" rel="noopener noreferrer">\${source.title}</a>
                            <span class="source-type-badge">\${source.sourceType}</span>
                            \${biasIndicator}
                            \${source.isTrusted ? '<span class="trusted-badge">Trusted</span>' : ''}
                        </div>
                        \${hostname ? \`<div class="source-uri">\${hostname}</div>\` : ''}
                        \${publicationDate ? \`<div class="publication-date">\${publicationDate}</div>\` : ''}
                        \${source.author ? \`<div class="author-info">Author: \${source.author}</div>\` : ''}
                    \`;
                    
                    sourcesList.appendChild(li);
                });
                
                sourcesSection.style.display = 'block';
            }

            document.getElementById('results-container').style.display = 'block';
        };

        const handleFactCheck = async (isCategory = false) => {
            // Check if user has accepted terms (using in-memory variable)
            if (!termsAccepted) {
                // Show the modal
                document.getElementById('notice-overlay').style.display = 'flex';
                document.body.style.overflow = 'hidden';
                return;
            }
            
            const claimInput = isCategory ? 
                document.getElementById('category-claim-input') : 
                document.getElementById('claim-input');
            const submitButton = isCategory ? 
 
                document.getElementById('category-submit-button') : 
                document.getElementById('submit-button');
            
            const claim = claimInput.value.trim();
            if (!claim) return;

            submitButton.disabled = true;
            submitButton.textContent = 'Analyzing...';

            // Hide previous results and errors
            hideResults();
            startLoading();

            // Build system instruction with category-specific prompts
            let systemInstruction = \`You are a multilingual, impartial, and trusted AI fact-checker for the Philippines. Your primary goal is to verify claims and combat misinformation with the highest standards of accuracy.

**Core Instructions:**
1.  **Timeliness and Accuracy:** You must use the most up-to-date information available from your search tools.

2.  **Mandatory Verification Protocol & Source Hierarchy:** Your entire fact-checking process MUST adhere to this strict protocol.
    - **Tier 1 (Primary Evidence - Highest Priority):** Your primary evidence MUST come from established, trusted Philippine news sources and official reports. Your final verdict and summary must be overwhelmingly supported by these high-quality sources.
    - **Tier 2 (Unreliable - Use with Extreme Caution):** Personal blogs, forums, social media, and other user-generated content are considered unreliable sources. They MUST NOT be used as primary evidence for your verdict.
    - **Strict Corroboration Rule:** If a claim originates from or is only found in Tier 2 sources, you MUST find corroboration from at least **two different Tier 1 sources** before you can consider it verified.
    - **Failure to Corroborate:** If you cannot find corroboration from Tier 1 sources, the claim MUST be considered unverified. Your verdict must be "CANNOT VERIFY" and the summary must state that the claim could not be substantiated by reliable sources.

3.  **Source Diversity:** While prioritizing Tier 1 sources, your search should be comprehensive. Actively seek diverse evidence types, including news articles, official government reports, and relevant video content from credible channels.\`;

            // Add category-specific instructions if applicable
            if (isCategory && selectedCategory) {
                systemInstruction += \`\\n\\n**CATEGORY-SPECIFIC INSTRUCTIONS:**\\n\${getCategorySpecificPrompt(selectedCategory, claim)}\`;
            }

            systemInstruction += \`

**Handling Video URLs:**
If a user provides a video URL (e.g., from YouTube), you must use your search tool to find reliable text-based resources about it, such as transcripts, detailed summaries, or news articles describing the video's content.

- **If you find textual information:** Identify the main claims from the text. You must then perform a comprehensive fact-check by applying the **Mandatory Verification Protocol & Source Hierarchy** above, cross-referencing claims against Tier 1 sources.
- **If you CANNOT find textual information:** You MUST respond with the following structured format:
  - Start the first line with \\\`VERDICT: CANNOT VERIFY\\\`.
  - On the next line, start with \\\`SUMMARY: \\\` and provide this specific explanation: "As an AI, I cannot directly watch or listen to video content. My search for transcripts, articles, or summaries describing the content of the provided video link did not return enough information to perform a fact-check. To verify the claims, please provide them in text format."

**Output Format:**
For ALL claims, your response MUST strictly follow this format:
1. A single line starting with "VERDICT: " followed by one of: TRUE, FALSE, MISLEADING, or CANNOT VERIFY.
2. A new line starting with "SUMMARY: " followed by a brief, evidence-based summary of your findings.\`;

            try {
                const response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: \`\${systemInstruction}\\n\\nClaim to check: "\${claim}"\`,
                    config: {
                        tools: [{ googleSearch: {} }],
                    },
                });

                const { verdict, summary } = parseResponse(response.text);
                
                const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
                
                let sourcesWithMetadata = (groundingChunks || [])
                    .map((chunk) => {
                        let hostname = '';
                        const uri = chunk.web?.uri || '#';
                        try {
                            hostname = new URL(uri).hostname.replace(/^www\\./, '');
                        } catch (e) { /* ignore invalid URLs */ }

                        const isTrusted = TRUSTED_SOURCES.includes(hostname);
                        const sourceType = getSourceType(uri, isTrusted);
                        
                        return {
                            title: chunk.web?.title || 'Untitled Source',
                            uri: uri,
                            isTrusted: isTrusted,
                            sourceType: sourceType,
                        }
                    })
                    .filter(source => source.uri !== '#');

                // Sort before deduplicating to prioritize keeping trusted sources
                sourcesWithMetadata.sort((a, b) => {
                    if (a.isTrusted && !b.isTrusted) return -1;
                    if (!a.isTrusted && b.isTrusted) return 1;
                    return 0;
                });

                // Deduplicate sources based on URI and normalized title
                const uniqueSourcesMap = new Map();
                const seenTitles = new Set();

                for (const source of sourcesWithMetadata) {
                    if (!uniqueSourcesMap.has(source.uri)) {
                        const normalized = normalizeTitle(source.title);
                        if (!seenTitles.has(normalized)) {
                            uniqueSourcesMap.set(source.uri, source);
                            seenTitles.add(normalized);
                        }
                    }
                }

                const uniqueSources = Array.from(uniqueSourcesMap.values());
                    
                displayResults({ claim, verdict, summary, sources: uniqueSources });
            } catch (err) {
                console.error(err);
                showError('An error occurred while trying to fact-check the claim. Please try again.');
            } finally {
                stopLoading();
                submitButton.disabled = false;
                submitButton.textContent = 'Check Fact';
            }
        };

        document.getElementById('submit-button').addEventListener('click', () => handleFactCheck(false));
        document.getElementById('category-submit-button').addEventListener('click', () => handleFactCheck(true));
        
        document.getElementById('claim-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                handleFactCheck(false);
            }
        });
        
        document.getElementById('category-claim-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                handleFactCheck(true);
            }
        });
        
        // Simple initialization - termsAccepted is in-memory and defaults to false
        // Modal will show each session until the user accepts via the checkbox and Continue
        if (termsAccepted) {
            document.getElementById('notice-overlay').style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // Initialize the app when DOM is loaded
        // Call initializeApp immediately since we're in a script module
    // header logo uses remote URL directly (user preference)
    initializeApp();
    </script>
</body>
</html>
`;

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <WebView
        source={{ html: htmlContent }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        originWhitelist={['*']}
        allowUniversalAccessFromFileURLs={true}
        allowFileAccessFromFileURLs={true}
        mixedContentMode="compatibility"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  webview: {
    flex: 1,
  },
});
