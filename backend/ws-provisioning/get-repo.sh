
rm -r "$1"
mkdir "$1"

unzip -o -qq repo.zip -d "$1"
unzip -o -qq template.zip -d "$1"
rm repo.zip
rm template.zip

cd "$1"

mkdir temp
mv genesys-samples*/* temp/
rm -r genesys-samples*

mv matcornic-hugo-theme-learn*/* temp/themes/hugo-theme-learn/
rm -r matcornic-hugo-theme-learn*

cd temp
hugo
cd ..
mv temp/* .
rm -r temp
cd ..
