console.log("app-logic.js says: this seem to be working"),console.log("interface.js says: this seem to be working"),(()=>{const e=document.getElementById("content"),t=document.getElementById("dropdownButton"),o=document.getElementById("dropdownMenu"),n=document.getElementById("backgroundImg"),s=document.querySelector("header"),i=[];return{init:()=>{let c=!0;e.addEventListener("click",(t=>{if(c){const o=n.getBoundingClientRect();((t,o)=>{if(console.log("Clicked position: ",t,o),console.log("Header height: ",s.offsetHeight),o<s.offsetHeight)return void console.log("Clicked within the header. Circle not added.");const n=document.createElement("div");n.className="circle",n.style.left=t-25+"px",n.style.top=o-25+"px",e.appendChild(n),i.push(n)})(t.clientX-o.left,t.clientY-o.top)}else(()=>{if(i.length>0){const t=i.pop();e.removeChild(t)}})();c=!c})),t.addEventListener("click",(()=>{o.classList.toggle("show"),t.textContent=o.classList.contains("show")?"▲ Hide Characters ▲":"▼ Show Characters ▼"}))}}})().init();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiQUFBQUEsUUFBUUMsSUFBSSw4Q0NBWkQsUUFBUUMsSUFBSSw4Q0FFTyxNQUNqQixNQUFNQyxFQUFVQyxTQUFTQyxlQUFlLFdBQ2xDQyxFQUFpQkYsU0FBU0MsZUFBZSxrQkFDekNFLEVBQWVILFNBQVNDLGVBQWUsZ0JBQ3ZDRyxFQUFnQkosU0FBU0MsZUFBZSxpQkFDeENJLEVBQVNMLFNBQVNNLGNBQWMsVUFDaENDLEVBQVUsR0FrRGhCLE1BQU8sQ0FDTEMsS0F6QlcsS0FDWCxJQUFJQyxHQUFpQixFQUVyQlYsRUFBUVcsaUJBQWlCLFNBQVVDLElBQ2pDLEdBQUlGLEVBQWdCLENBQ2xCLE1BQU1HLEVBQU9SLEVBQWNTLHdCQTdCWixFQUFDQyxFQUFHQyxLQUt2QixHQUpBbEIsUUFBUUMsSUFBSSxxQkFBc0JnQixFQUFHQyxHQUNyQ2xCLFFBQVFDLElBQUksa0JBQW1CTyxFQUFPVyxjQUdsQ0QsRUFBSVYsRUFBT1csYUFFYixZQURBbkIsUUFBUUMsSUFBSSxnREFJZCxNQUFNbUIsRUFBU2pCLFNBQVNrQixjQUFjLE9BQ3RDRCxFQUFPRSxVQUFZLFNBQ25CRixFQUFPRyxNQUFNQyxLQUFVUCxFQUFJLEdBQVAsS0FDcEJHLEVBQU9HLE1BQU1FLElBQVNQLEVBQUksR0FBUCxLQUNuQmhCLEVBQVF3QixZQUFZTixHQUNwQlYsRUFBUWlCLEtBQUtQLEVBQU8sRUFpQmhCUSxDQUZVZCxFQUFNZSxRQUFVZCxFQUFLUyxLQUNyQlYsRUFBTWdCLFFBQVVmLEVBQUtVLElBRWpDLEtBaEJpQixNQUNuQixHQUFJZixFQUFRcUIsT0FBUyxFQUFHLENBQ3RCLE1BQU1DLEVBQWlCdEIsRUFBUXVCLE1BQy9CL0IsRUFBUWdDLFlBQVlGLEVBQ3RCLEdBYUlHLEdBR0Z2QixHQUFrQkEsQ0FBYyxJQUdsQ1AsRUFBZVEsaUJBQWlCLFNBQVMsS0FDdkNQLEVBQWE4QixVQUFVQyxPQUFPLFFBQzlCaEMsRUFBZWlDLFlBQWNoQyxFQUFhOEIsVUFBVUcsU0FBUyxRQUN6RCxzQkFDQSxxQkFBcUIsR0FDekIsRUFNTCxFQTNEa0IsR0E2RFI1QiIsInNvdXJjZXMiOlsid2VicGFjazovL3doZXJlX2lzX3dhbGRvLy4vc3JjL2FwcC1sb2dpYy5qcyIsIndlYnBhY2s6Ly93aGVyZV9pc193YWxkby8uL3NyYy9pbnRlcmZhY2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc29sZS5sb2coXCJhcHAtbG9naWMuanMgc2F5czogdGhpcyBzZWVtIHRvIGJlIHdvcmtpbmdcIik7XG4iLCJjb25zb2xlLmxvZyhcImludGVyZmFjZS5qcyBzYXlzOiB0aGlzIHNlZW0gdG8gYmUgd29ya2luZ1wiKTtcblxuY29uc3QgQ29udHJvbGxlciA9ICgoKSA9PiB7XG4gIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIik7XG4gIGNvbnN0IGRyb3Bkb3duQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkcm9wZG93bkJ1dHRvblwiKTtcbiAgY29uc3QgZHJvcGRvd25NZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkcm9wZG93bk1lbnVcIik7XG4gIGNvbnN0IGJhY2tncm91bmRJbWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhY2tncm91bmRJbWdcIik7XG4gIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoZWFkZXJcIik7XG4gIGNvbnN0IGNpcmNsZXMgPSBbXTtcblxuICBjb25zdCBjcmVhdGVDaXJjbGUgPSAoeCwgeSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiQ2xpY2tlZCBwb3NpdGlvbjogXCIsIHgsIHkpO1xuICAgIGNvbnNvbGUubG9nKFwiSGVhZGVyIGhlaWdodDogXCIsIGhlYWRlci5vZmZzZXRIZWlnaHQpO1xuXG4gICAgLy8gQ2hlY2sgaWYgdGhlIGNsaWNrIGV2ZW50IG9jY3VycmVkIHdpdGhpbiB0aGUgaGVhZGVyXG4gICAgaWYgKHkgPCBoZWFkZXIub2Zmc2V0SGVpZ2h0KSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkNsaWNrZWQgd2l0aGluIHRoZSBoZWFkZXIuIENpcmNsZSBub3QgYWRkZWQuXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNpcmNsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY2lyY2xlLmNsYXNzTmFtZSA9IFwiY2lyY2xlXCI7XG4gICAgY2lyY2xlLnN0eWxlLmxlZnQgPSBgJHt4IC0gMjV9cHhgOyAvLyBBZGp1c3RlZCB4IHBvc2l0aW9uXG4gICAgY2lyY2xlLnN0eWxlLnRvcCA9IGAke3kgLSAyNX1weGA7IC8vIEFkanVzdGVkIHkgcG9zaXRpb25cbiAgICBjb250ZW50LmFwcGVuZENoaWxkKGNpcmNsZSk7XG4gICAgY2lyY2xlcy5wdXNoKGNpcmNsZSk7XG4gIH07XG4gIGNvbnN0IHJlbW92ZUNpcmNsZSA9ICgpID0+IHtcbiAgICBpZiAoY2lyY2xlcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBjaXJjbGVUb1JlbW92ZSA9IGNpcmNsZXMucG9wKCk7XG4gICAgICBjb250ZW50LnJlbW92ZUNoaWxkKGNpcmNsZVRvUmVtb3ZlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICBsZXQgaXNBZGRpbmdDaXJjbGUgPSB0cnVlO1xuXG4gICAgY29udGVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoaXNBZGRpbmdDaXJjbGUpIHtcbiAgICAgICAgY29uc3QgcmVjdCA9IGJhY2tncm91bmRJbWcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IHggPSBldmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICAgICAgICBjb25zdCB5ID0gZXZlbnQuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgICAgICBjcmVhdGVDaXJjbGUoeCwgeSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZW1vdmVDaXJjbGUoKTtcbiAgICAgIH1cblxuICAgICAgaXNBZGRpbmdDaXJjbGUgPSAhaXNBZGRpbmdDaXJjbGU7XG4gICAgfSk7XG5cbiAgICBkcm9wZG93bkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgZHJvcGRvd25NZW51LmNsYXNzTGlzdC50b2dnbGUoXCJzaG93XCIpO1xuICAgICAgZHJvcGRvd25CdXR0b24udGV4dENvbnRlbnQgPSBkcm9wZG93bk1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hvd1wiKVxuICAgICAgICA/IFwi4payIEhpZGUgQ2hhcmFjdGVycyDilrJcIlxuICAgICAgICA6IFwi4pa8IFNob3cgQ2hhcmFjdGVycyDilrxcIjtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGluaXQsXG4gIH07XG59KSgpO1xuXG5Db250cm9sbGVyLmluaXQoKTtcbiJdLCJuYW1lcyI6WyJjb25zb2xlIiwibG9nIiwiY29udGVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJkcm9wZG93bkJ1dHRvbiIsImRyb3Bkb3duTWVudSIsImJhY2tncm91bmRJbWciLCJoZWFkZXIiLCJxdWVyeVNlbGVjdG9yIiwiY2lyY2xlcyIsImluaXQiLCJpc0FkZGluZ0NpcmNsZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ4IiwieSIsIm9mZnNldEhlaWdodCIsImNpcmNsZSIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJzdHlsZSIsImxlZnQiLCJ0b3AiLCJhcHBlbmRDaGlsZCIsInB1c2giLCJjcmVhdGVDaXJjbGUiLCJjbGllbnRYIiwiY2xpZW50WSIsImxlbmd0aCIsImNpcmNsZVRvUmVtb3ZlIiwicG9wIiwicmVtb3ZlQ2hpbGQiLCJyZW1vdmVDaXJjbGUiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJ0ZXh0Q29udGVudCIsImNvbnRhaW5zIl0sInNvdXJjZVJvb3QiOiIifQ==