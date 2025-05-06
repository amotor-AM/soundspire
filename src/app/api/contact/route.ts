import { NextResponse } from 'next/server';
import { Resend } from "resend";

const resend = new Resend("re_AXQVhD1c_CJjnEwySQHpkszcwxC4ZSNJk");

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, subject, message } = body;

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const { data, error } = await resend.emails.send({
            from: "Soundspire Contact Form <web@contact.soundspiremedia.com>",
            to: ['ally.kandel@soundspiremedia.com', 'kristen.valentine@soundspiremedia.com', 'boldwebdevelopment@gmail.com'],
            subject: `Contact Form: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    @keyframes gradient {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    @keyframes float {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                        100% { transform: translateY(0px); }
                    }
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                        line-height: 1.6;
                        color: #fff;
                        margin: 0;
                        padding: 0;
                        background: #000;
                        min-height: 100vh;
                    }
                    .background {
                        position: relative;
                        min-height: 100vh;
                        background: radial-gradient(circle at center, rgba(56,189,248,0.15), transparent 70%);
                        overflow: hidden;
                    }
                    .grid-overlay {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        display: grid;
                        grid-template-columns: repeat(12, 1fr);
                        grid-template-rows: repeat(12, 1fr);
                        pointer-events: none;
                    }
                    .grid-cell {
                        border: 0.5px solid rgba(255, 255, 255, 0.05);
                    }
                    .particle {
                        position: absolute;
                        width: 4px;
                        height: 4px;
                        background: rgba(255, 255, 255, 0.5);
                        border-radius: 50%;
                        animation: float 3s ease-in-out infinite;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        padding: 30px;
                        background: rgba(0, 0, 0, 0.8);
                        border-radius: 12px;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        position: relative;
                        z-index: 1;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 30px;
                        padding: 20px;
                        background: linear-gradient(90deg, #FF3BFF 0%, #C651F2 50%, #8C39E0 100%);
                        background-size: 200% 200%;
                        animation: gradient 5s ease infinite;
                        border-radius: 8px;
                        position: relative;
                        overflow: hidden;
                    }
                    .header::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: linear-gradient(45deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%);
                        animation: gradient 3s ease infinite;
                    }
                    .header h2 {
                        color: white;
                        margin: 0;
                        font-size: 24px;
                        font-weight: bold;
                        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                    }
                    .content {
                        padding: 20px;
                        background: rgba(255, 255, 255, 0.05);
                        border-radius: 8px;
                        border: 1px solid rgba(255, 255, 255, 0.1);
                    }
                    .field {
                        margin-bottom: 15px;
                        padding: 10px;
                        background: rgba(255, 255, 255, 0.03);
                        border-radius: 6px;
                        border: 1px solid rgba(255, 255, 255, 0.05);
                    }
                    .field strong {
                        color: #C651F2;
                        display: block;
                        margin-bottom: 5px;
                        font-size: 14px;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }
                    .field span {
                        color: #fff;
                    }
                    .message {
                        background: rgba(140, 57, 224, 0.1);
                        padding: 15px;
                        border-radius: 6px;
                        border-left: 4px solid #8C39E0;
                        color: #fff;
                    }
                    @media (max-width: 480px) {
                        .container {
                            margin: 10px;
                            padding: 15px;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="background">
                    <div class="grid-overlay">
                        <div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div>
                        <div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div>
                        <div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div>
                        <div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div>
                        <div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div>
                        <div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div>
                        <div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div>
                        <div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div>
                        <div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div>
                        <div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div>
                        <div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div>
                        <div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div>
                    </div>
                    <div class="container">
                        <div class="header">
                            <h2>New Contact Form Submission</h2>
                        </div>
                        <div class="content">
                            <div class="field">
                                <strong>Name</strong>
                                <span>${name}</span>
                            </div>
                            <div class="field">
                                <strong>Email</strong>
                                <span>${email}</span>
                            </div>
                            <div class="field">
                                <strong>Subject</strong>
                                <span>${subject}</span>
                            </div>
                            <div class="field">
                                <strong>Message</strong>
                                <div class="message">
                                    ${message.replace(/\n/g, '<br>')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            `,
        });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, result: data }, { status: 200 });
    } catch (err) {
        console.error('Error in contact API:', err);
        
        return NextResponse.json({ success: false, message: 'Failed to process request' }, { status: 500 });
    }
}