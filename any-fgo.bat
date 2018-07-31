cp nohup.out lastNohup.out;
echo '' > nohup.out;
start /b anyproxy -p 8888 -w 8889 -r fgo.js -i  2>> out.log