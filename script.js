document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    document.querySelectorAll('.btn-consult, .btn-request-consult').forEach(button => {
        button.addEventListener('click', function() {
            alert('Consultation request submitted!');
        });
    });

    document.querySelectorAll('.btn-buy').forEach(button => {
        button.addEventListener('click', function() {
            alert('Redirecting to purchase page!');
        });
    });

    document.querySelectorAll('.btn-read-more').forEach(button => {
        button.addEventListener('click', function() {
            alert('Redirecting to more information!');
        });
    });
});

const config = {
    DISCORD_WEBHOOK_URL: 'webhook_url_here'
};

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const formObject = Object.fromEntries(formData.entries());

    const message = {
        embeds: [{
            title: 'New Message from Contact Form',
            color: 0x00FFFF,
            fields: [
                {
                    name: 'Full Name',
                    value: `${formObject.first_name} ${formObject.last_name}`,
                    inline: true
                },
                {
                    name: 'Email',
                    value: formObject.email,
                    inline: true
                },
                {
                    name: 'Phone Number',
                    value: formObject.phone,
                    inline: true
                },
                {
                    name: 'Message',
                    value: formObject.message
                }
            ],
            footer: {
                text: 'Submitted via Ashish Singh\'s Portfolio'
            }
        }]
    };

    if (config && config.DISCORD_WEBHOOK_URL) {
        fetch(config.DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        })
        .then(response => {
            if (response.ok) {
                alert('Thank you for your message! We will get back to you soon.');
                document.getElementById('contactForm').reset();
            } else {
                alert('Sorry, there was an error submitting your message. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Sorry, there was an error submitting your message. Please try again.');
        });
    } else {
        console.error('Config or DISCORD_WEBHOOK_URL is not defined');
        alert('Configuration error. Please try again later.');
    }
});