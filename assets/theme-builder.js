'use strict';
const themeIds=['theme','mood','buyer-note','occasion','pieces','size','ratio','pixels','material','packaging','delivery','shipping-note','product-url'];
const getValue=id=>document.getElementById(id).value.trim();
const confirmed=id=>getValue(id)||'［未確認：商品ページで確認して記入］';
function updateDrafts(){
 const theme=getValue('theme'),mood=getValue('mood'),buyer=getValue('buyer-note'),occasion=getValue('occasion');
 const art=`販売用パズルに使うイラストを1枚作ってください。

【描きたいテーマ】${theme||'［自分が描きたいテーマを記入］'}
【雰囲気】${mood||'テーマに合う雰囲気。特定の作家の画風は指定しない'}
【買ってほしい人】${buyer||'指定なし。テーマが好きな人を想定'}
【楽しむ場面】${occasion||'指定なし'}
【縦横比・向き】${confirmed('ratio')}
【出力画像サイズ・解像度】${confirmed('pixels')}

テーマに合う主役と背景の細部を、画面全体に配置してください。場所ごとに色・形・模様・小物の違いを作り、ピースを探す手がかりがある絵にします。広い単色の背景を減らし、主役や大切なモチーフは印刷範囲の端から離してください。
文字・ロゴ・透かし・白い余白・額縁・パズルの切り目は入れません。人物や動物を描く場合は、顔や手足を自然にしてください。
画像条件が未確認、または縦横比と画素数に食い違いがある場合は、制作前に利用者へ確認してください。指定サイズで出力できない場合は実際の画像サイズを伝え、入稿可能と断定しないでください。`;
 const description=`${theme||'［自分の絵柄の名前］'}｜${getValue('pieces')?getValue('pieces')+'ピースのパズル':'パズル'}

${buyer?buyer+'におすすめの、':''}${theme||'［テーマ］'}を描いたパズルです。${mood?mood+'の世界を、少しずつ組み立てて楽しめます。':'絵を少しずつ組み立てて楽しめます。'}${occasion?'楽しむ場面：'+occasion+'。':''}

ピース数：${confirmed('pieces')}
完成サイズ：${confirmed('size')}
素材・仕上げ：${confirmed('material')}
付属品・パッケージ：${confirmed('packaging')}
製造・発送：ご注文後に製造・発送します。
お届けの目安：${confirmed('delivery')}
送料：${confirmed('shipping-note')}
イラストにはAIを使用しています。画面と実物では色の見え方が異なる場合があります。`;
 document.getElementById('art-prompt').textContent=art;
 document.getElementById('fix-prompt').textContent=`添付した「${theme||'［自分のテーマ］'}」のパズル用イラストを修正してください。
修正箇所：［場所と、形の崩れ・不要な文字・端で切れる主役などの問題を具体的に記入］。
正しい状態：［どう直すかを記入］。
それ以外の正しい構図・モチーフ・色・雰囲気はできるだけ保ってください。文字・ロゴ・白い余白・パズルの切り目は追加しません。
必要な縦横比：${confirmed('ratio')}
必要な画像サイズ：${confirmed('pixels')}
修正後も実際の画像サイズを伝え、指定サイズを満たせなければその旨を示してください。`;
 document.getElementById('description-ja').textContent=description;
 document.getElementById('description-en').textContent=`以下のパズルの商品紹介を、販売ページに掲載できる自然な英語にしてください。商品タイトルと紹介文、仕様を含めます。
数字・単位・納期・送料・付属品は変えません。未確認の項目は未確認と分かる状態で残し、推測で埋めないでください。AI使用の記載も残してください。テーマを別の題材へ変えず、素材・品質・対象年齢・実績などの情報を追加しません。

【日本語原稿】
${description}`;
 document.getElementById('sns-copy').textContent=`${buyer?buyer+'へ。':'「'+(theme||'自分のテーマ')+'」が好きな方へ。'}
${theme||'［自分のテーマ］'}を描いたパズルを作りました。
${mood?mood+'の絵を、少しずつ組み立てて楽しめます。':'少しずつ組み立てて、絵を完成させる時間を楽しめます。'}
${occasion?'おすすめの場面：'+occasion+'。\n':''}ピース数：${confirmed('pieces')}
完成サイズ：${confirmed('size')}
送料とお届けの目安は、商品ページからご確認ください。
購入はこちら：${getValue('product-url')||'［公開した商品のURLを入力］'}`;
 document.querySelectorAll('[data-copy]').forEach(button=>{button.disabled=!theme;button.title=theme?'':'先に「何を描きたい？」を入力してください';});
}
themeIds.forEach(id=>document.getElementById(id).addEventListener('input',updateDrafts));
document.getElementById('use-cat-example').addEventListener('click',()=>{
 const example={theme:'猫たちが暮らす森の小さな本屋さん',mood:'あたたかい絵本風','buyer-note':'猫と読書が好きな人',occasion:'誕生日プレゼント',pieces:'252',size:'14×11インチ（約35.6×27.9cm）',ratio:'横長14:11'};
 for(const [id,value] of Object.entries(example))document.getElementById(id).value=value;
 updateDrafts();
});
updateDrafts();
