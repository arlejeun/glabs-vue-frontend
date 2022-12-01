
rm -r $1
mkdir $1
cd $1

curl --location --request GET "https://api.github.com/repos/uncleash/$1/zipball" \
--header "Accept: application/vnd.github+json" \
--header "Cookie: logged_in=no" --output repo.zip

unzip -o -qq repo.zip
rm repo.zip
mkdir temp
mv uncleash*/* temp/
rm -r uncleash*

curl --location --request GET "https://api.github.com/repos/matcornic/hugo-theme-learn/zipball" \
--header "Accept: application/vnd.github+json" \
--header "Cookie: logged_in=no" --output repo.zip

unzip -o -qq repo.zip
rm repo.zip
mv matcornic-hugo-theme-learn*/* temp/themes/hugo-theme-learn/
rm -r matcornic-hugo-theme-learn*

cd temp
hugo
cd ..
mv temp/public/* .
cd ..
