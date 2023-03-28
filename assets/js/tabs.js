const removeActiveClasses = function (ulElement) {
    const lis = ulElement.querySelectorAll('li');
    Array.prototype.forEach.call(lis, function(li) {
        li.classList.remove('active');
    });
  }

  const getChildPosition = function (element) {
        var parent = element.parentNode;
        var i = 0;
        for (var i = 0; i < parent.children.length; i++) {
            if (parent.children[i] === element) {
                return i;
            }
        }

        throw new Error('No parent found');
    }

window.addEventListener('load', function () {
    const tabLinks = document.querySelectorAll('ul.tab li a');

    Array.prototype.forEach.call(tabLinks, function(link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();

        liTab = link.parentNode;
        ulTab = liTab.parentNode;
        position = getChildPosition(liTab);
        if (liTab.className.includes('active')) {
          return;
        }

        removeActiveClasses(ulTab);
        tabContentId = ulTab.getAttribute('data-tab');
        tabContentElement = document.getElementById(tabContentId);
        removeActiveClasses(tabContentElement);

        tabContentElement.querySelectorAll('li')[position].classList.add('active');
        liTab.classList.add('active');
      }, false);
    });
});


// // This assumes that you're using Rouge; if not, update the selector
// const codeBlocks = document.querySelectorAll('.code-header + .highlighter-rouge');
// const copyCodeButtons = document.querySelectorAll('.copy-code-button');

// copyCodeButtons.forEach((copyCodeButton, index) => {
//   const code = codeBlocks[index].innerText;

//   copyCodeButton.addEventListener('click', () => {
//     // Copy the code to the user's clipboard
//     window.navigator.clipboard.writeText(code);

//     // Update the button text visually
//     const { innerText: originalText } = copyCodeButton;
//     copyCodeButton.innerText = 'Copied!';

//     // (Optional) Toggle a class for styling the button
//     copyCodeButton.classList.add('copied');

//     // After 2 seconds, reset the button to its initial UI
//     setTimeout(() => {
//       copyCodeButton.innerText = originalText;
//       copyCodeButton.classList.remove('copied');
//     }, 2000);
//   });
// });
