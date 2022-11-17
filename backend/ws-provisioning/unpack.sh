mkdir temp

unzip -o -qq repo.zip 
unzip -o -qq template.zip 
rm repo.zip
rm template.zip

mv genesys-samples*/* temp/
rm -r genesys-samples*

mv matcornic-hugo-theme-learn*/* temp/themes/hugo-theme-learn/
rm -r matcornic-hugo-theme-learn*

cd temp
hugo
cd ..
mv temp/* .
rm -r temp
