let $ = document.querySelector.bind(document);
let backBtn = $('#back-btn');
let nextBtn = $('#next-btn');
let reference = $('#reference');
let recommendations = $('#list-recommendations');

window.onload = () => {
	let script = document.createElement('script');
    script.src = 'http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X';
    document.body.appendChild(script);	
}

let X = content =>{
	init(content.data);
}

let init = data =>{
	reference.innerHTML = makeItem(data.reference.item);
	recommendations.innerHTML = 
		data.recommendation.map(item =>`<li>${makeItem(item)}</li>`).join('');
	recommendations.style.left = 0;
}

let makeItem = data =>{
	return `  
		<a href="${data.detailUrl}" target="_blank">
        	<section class="product">
	        	<figure class="product-image">
	        		<img src="${data.imageName}" width="152" height="120">
	        	</figure>
				<div class="product-description">${data.name}</div>
	        	<div class="product-price">
	        		<div class="product-old-price">
	        			${data.oldPrice ? `De: ${data.oldPrice}` : '' }
	        		</div>
	        		<div class="product-current-price">
	        			Por: ${data.price}	
	        		</div>
	        		<div class="product-divided-price">
	        			${data.productInfo.paymentConditions} <br> sem juros
	        		</div>
	        	</div>
	        </section>
        </a>`;
}

let back = () =>{
	
	nextBtn.classList.remove('disabled');

	if(parseInt(recommendations.style.left) == 0) return;

	recommendations.style.left = (parseInt(recommendations.style.left) + 50) + 'px';

	if(parseInt(recommendations.style.left) + 50 == 0) 
		backBtn.classList.add('disabled');

}

let next = () =>{

	backBtn.classList.remove('disabled');

	if(parseInt(recommendations.style.left) == -1150) return;

	recommendations.style.left = (parseInt(recommendations.style.left) - 50) + 'px';

	if(parseInt(recommendations.style.left) - 50 == -1150)
		nextBtn.classList.add('disabled');
}