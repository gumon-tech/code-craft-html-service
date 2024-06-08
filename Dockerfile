# ใช้ Node.js เวอร์ชัน 14 บน Alpine Linux เป็นเบสอิมเมจ
FROM node:20.9.0

# กำหนดไดเรกทอรีทำงานในคอนเทนเนอร์
WORKDIR /usr/src/app

# คัดลอกไฟล์ package.json และ package-lock.json (ถ้ามี)
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกไฟล์ที่เหลือของแอปพลิเคชัน
COPY . .

# สร้างแอปพลิเคชัน NestJS
RUN npm run build

# เปิดพอร์ตที่แอปพลิเคชันทำงานอยู่
EXPOSE 3000

# กำหนดคำสั่งในการรันแอปพลิเคชัน
CMD ["npm", "run", "start:prod"]
