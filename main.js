console.log("app-logic.js says: this seem to be working"),(()=>{console.log("interface.js says: this seem to be working");const e=(()=>{const e=document.getElementById("content"),t=t=>{const o=document.createElement("div");o.className="feedback-msg",o.textContent=t,e.appendChild(o),setTimeout((()=>{o.style.opacity="0",setTimeout((()=>{o.remove()}),1e3)}),5e3)};return{createPopup:(o,n)=>{const c=document.createElement("div");c.className="popup",c.style.left=`${o+60}px`,c.style.top=n-70+"px",["Bowser","Neo","Waldo"].forEach((e=>{const o=document.createElement("a");o.textContent=e,o.href="#",o.addEventListener("click",(()=>{c.remove(),t("Keep looking!")})),c.appendChild(o)})),e.appendChild(c)},createFeedbackMsg:t}})();(()=>{const t=document.getElementById("content"),o=document.getElementById("dropdownButton"),n=document.getElementById("dropdownMenu"),c=document.getElementById("backgroundImg");let s=!0;const l=[],d=o=>{if(!o.target.closest("header")&&!o.target.closest("footer")){if(s){const n=c.getBoundingClientRect(),s=o.clientX-n.left,d=o.clientY-n.top;((e,o)=>{const n=document.createElement("div");n.className="circle",n.style.left=e-50+"px",n.style.top=o-50+"px",t.appendChild(n),l.push(n)})(s,d),e.createPopup(s,d)}else{(()=>{if(l.length>0){const e=l.pop();t.removeChild(e)}})();const e=document.querySelector(".popup");e&&e.remove()}s=!s}};return{init:()=>{t.addEventListener("click",d),o.addEventListener("click",(()=>{n.classList.toggle("show"),o.textContent=n.classList.contains("show")?"▲ Hide Characters ▲":"▼ Show Characters ▼"}))}}})().init()})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiQUFBQUEsUUFBUUMsSUFBSSw4QyxNQ01aRCxRQUFRQyxJQUFJLDhDQUVaLE1BQU1DLEVBQVcsTUFDZixNQUFNQyxFQUFVQyxTQUFTQyxlQUFlLFdBRWxDQyxFQUFxQkMsSUFDekIsTUFBTUMsRUFBY0osU0FBU0ssY0FBYyxPQUMzQ0QsRUFBWUUsVUFBWSxlQUN4QkYsRUFBWUcsWUFBY0osRUFFMUJKLEVBQVFTLFlBQVlKLEdBRXBCSyxZQUFXLEtBQ1RMLEVBQVlNLE1BQU1DLFFBQVUsSUFDNUJGLFlBQVcsS0FDVEwsRUFBWVEsUUFBUSxHQUNuQixJQUFLLEdBQ1AsSUFBSyxFQXlCVixNQUFPLENBQ0xDLFlBdkJrQixDQUFDQyxFQUFHQyxLQUN0QixNQUFNQyxFQUFRaEIsU0FBU0ssY0FBYyxPQUNyQ1csRUFBTVYsVUFBWSxRQUVsQlUsRUFBTU4sTUFBTU8sS0FBTyxHQUFHSCxFQUFJLE9BQzFCRSxFQUFNTixNQUFNUSxJQUFTSCxFQUFJLEdBQVAsS0FFRixDQUFDLFNBQVUsTUFBTyxTQUMxQkksU0FBU0MsSUFDZixNQUFNQyxFQUFTckIsU0FBU0ssY0FBYyxLQUN0Q2dCLEVBQU9kLFlBQWNhLEVBQ3JCQyxFQUFPQyxLQUFPLElBQ2RELEVBQU9FLGlCQUFpQixTQUFTLEtBQy9CUCxFQUFNSixTQUNOVixFQUFrQixnQkFBZ0IsSUFFcENjLEVBQU1SLFlBQVlhLEVBQU8sSUFHM0J0QixFQUFRUyxZQUFZUSxFQUFNLEVBSzFCZCxvQkFFSCxFQTVDZ0IsR0E4Q0UsTUFDakIsTUFBTUgsRUFBVUMsU0FBU0MsZUFBZSxXQUNsQ3VCLEVBQWlCeEIsU0FBU0MsZUFBZSxrQkFDekN3QixFQUFlekIsU0FBU0MsZUFBZSxnQkFDdkN5QixFQUFnQjFCLFNBQVNDLGVBQWUsaUJBRTlDLElBQUkwQixHQUFpQixFQUNyQixNQUFNQyxFQUFVLEdBa0JWQyxFQUFzQkMsSUFDMUIsSUFBSUEsRUFBTUMsT0FBT0MsUUFBUSxZQUFhRixFQUFNQyxPQUFPQyxRQUFRLFVBQTNELENBSUEsR0FBSUwsRUFBZ0IsQ0FDbEIsTUFBTU0sRUFBT1AsRUFBY1Esd0JBQ3JCcEIsRUFBSWdCLEVBQU1LLFFBQVVGLEVBQUtoQixLQUN6QkYsRUFBSWUsRUFBTU0sUUFBVUgsRUFBS2YsSUF4QmQsRUFBQ0osRUFBR0MsS0FDdkIsTUFBTXNCLEVBQVNyQyxTQUFTSyxjQUFjLE9BQ3RDZ0MsRUFBTy9CLFVBQVksU0FDbkIrQixFQUFPM0IsTUFBTU8sS0FBVUgsRUFBSSxHQUFQLEtBQ3BCdUIsRUFBTzNCLE1BQU1RLElBQVNILEVBQUksR0FBUCxLQUNuQmhCLEVBQVFTLFlBQVk2QixHQUNwQlQsRUFBUVUsS0FBS0QsRUFBTyxFQW1CbEJFLENBQWF6QixFQUFHQyxHQUNoQmpCLEVBQVNlLFlBQVlDLEVBQUdDLEVBQzFCLEtBQU8sQ0FsQlksTUFDbkIsR0FBSWEsRUFBUVksT0FBUyxFQUFHLENBQ3RCLE1BQU1DLEVBQWlCYixFQUFRYyxNQUMvQjNDLEVBQVE0QyxZQUFZRixFQUN0QixHQWVFRyxHQUNBLE1BQU01QixFQUFRaEIsU0FBUzZDLGNBQWMsVUFDakM3QixHQUNGQSxFQUFNSixRQUVWLENBRUFlLEdBQWtCQSxDQWhCbEIsQ0FnQmdDLEVBY2xDLE1BQU8sQ0FDTG1CLEtBWlcsS0FDWC9DLEVBQVF3QixpQkFBaUIsUUFBU00sR0FFbENMLEVBQWVELGlCQUFpQixTQUFTLEtBQ3ZDRSxFQUFhc0IsVUFBVUMsT0FBTyxRQUM5QnhCLEVBQWVqQixZQUFja0IsRUFBYXNCLFVBQVVFLFNBQVMsUUFDekQsc0JBQ0EscUJBQXFCLEdBQ3pCLEVBTUwsRUE3RGtCLEdBK0RSSCxNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2hlcmVfaXNfd2FsZG8vLi9zcmMvYXBwLWxvZ2ljLmpzIiwid2VicGFjazovL3doZXJlX2lzX3dhbGRvLy4vc3JjL2ludGVyZmFjZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zb2xlLmxvZyhcImFwcC1sb2dpYy5qcyBzYXlzOiB0aGlzIHNlZW0gdG8gYmUgd29ya2luZ1wiKTtcbiIsIi8vIFRPIERPOlxuLy8gRmluaXNoIDkuXG4vLyBEbyA3LlxuLy8gTW92ZSBsb2dpYyB0byBhcHAtbG9naWMuanMgaWYgbmVlZGVkXG4vLyBDb250aW51ZSB3aXRoIDEwLlxuXG5jb25zb2xlLmxvZyhcImludGVyZmFjZS5qcyBzYXlzOiB0aGlzIHNlZW0gdG8gYmUgd29ya2luZ1wiKTtcblxuY29uc3QgUmVuZGVyZXIgPSAoKCkgPT4ge1xuICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpO1xuXG4gIGNvbnN0IGNyZWF0ZUZlZWRiYWNrTXNnID0gKG1lc3NhZ2UpID0+IHtcbiAgICBjb25zdCBmZWVkYmFja01zZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZmVlZGJhY2tNc2cuY2xhc3NOYW1lID0gXCJmZWVkYmFjay1tc2dcIjtcbiAgICBmZWVkYmFja01zZy50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG5cbiAgICBjb250ZW50LmFwcGVuZENoaWxkKGZlZWRiYWNrTXNnKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZmVlZGJhY2tNc2cuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGZlZWRiYWNrTXNnLnJlbW92ZSgpO1xuICAgICAgfSwgMTAwMCk7XG4gICAgfSwgNTAwMCk7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlUG9wdXAgPSAoeCwgeSkgPT4ge1xuICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwb3B1cC5jbGFzc05hbWUgPSBcInBvcHVwXCI7XG5cbiAgICBwb3B1cC5zdHlsZS5sZWZ0ID0gYCR7eCArIDYwfXB4YDtcbiAgICBwb3B1cC5zdHlsZS50b3AgPSBgJHt5IC0gNzB9cHhgO1xuXG4gICAgY29uc3Qgb3B0aW9ucyA9IFtcIkJvd3NlclwiLCBcIk5lb1wiLCBcIldhbGRvXCJdO1xuICAgIG9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICBjb25zdCBjaG9pY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgIGNob2ljZS50ZXh0Q29udGVudCA9IG9wdGlvbjtcbiAgICAgIGNob2ljZS5ocmVmID0gXCIjXCI7XG4gICAgICBjaG9pY2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgcG9wdXAucmVtb3ZlKCk7XG4gICAgICAgIGNyZWF0ZUZlZWRiYWNrTXNnKFwiS2VlcCBsb29raW5nIVwiKTtcbiAgICAgIH0pO1xuICAgICAgcG9wdXAuYXBwZW5kQ2hpbGQoY2hvaWNlKTtcbiAgICB9KTtcblxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQocG9wdXApO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgY3JlYXRlUG9wdXAsXG4gICAgY3JlYXRlRmVlZGJhY2tNc2csXG4gIH07XG59KSgpO1xuXG5jb25zdCBDb250cm9sbGVyID0gKCgpID0+IHtcbiAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGVudFwiKTtcbiAgY29uc3QgZHJvcGRvd25CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRyb3Bkb3duQnV0dG9uXCIpO1xuICBjb25zdCBkcm9wZG93bk1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRyb3Bkb3duTWVudVwiKTtcbiAgY29uc3QgYmFja2dyb3VuZEltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmFja2dyb3VuZEltZ1wiKTtcblxuICBsZXQgaXNBZGRpbmdDaXJjbGUgPSB0cnVlO1xuICBjb25zdCBjaXJjbGVzID0gW107XG5cbiAgY29uc3QgY3JlYXRlQ2lyY2xlID0gKHgsIHkpID0+IHtcbiAgICBjb25zdCBjaXJjbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNpcmNsZS5jbGFzc05hbWUgPSBcImNpcmNsZVwiO1xuICAgIGNpcmNsZS5zdHlsZS5sZWZ0ID0gYCR7eCAtIDUwfXB4YDtcbiAgICBjaXJjbGUuc3R5bGUudG9wID0gYCR7eSAtIDUwfXB4YDtcbiAgICBjb250ZW50LmFwcGVuZENoaWxkKGNpcmNsZSk7XG4gICAgY2lyY2xlcy5wdXNoKGNpcmNsZSk7XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlQ2lyY2xlID0gKCkgPT4ge1xuICAgIGlmIChjaXJjbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGNpcmNsZVRvUmVtb3ZlID0gY2lyY2xlcy5wb3AoKTtcbiAgICAgIGNvbnRlbnQucmVtb3ZlQ2hpbGQoY2lyY2xlVG9SZW1vdmUpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVDb250ZW50Q2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCJoZWFkZXJcIikgfHwgZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCJmb290ZXJcIikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaXNBZGRpbmdDaXJjbGUpIHtcbiAgICAgIGNvbnN0IHJlY3QgPSBiYWNrZ3JvdW5kSW1nLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgY29uc3QgeCA9IGV2ZW50LmNsaWVudFggLSByZWN0LmxlZnQ7XG4gICAgICBjb25zdCB5ID0gZXZlbnQuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgICAgY3JlYXRlQ2lyY2xlKHgsIHkpO1xuICAgICAgUmVuZGVyZXIuY3JlYXRlUG9wdXAoeCwgeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZUNpcmNsZSgpO1xuICAgICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwXCIpO1xuICAgICAgaWYgKHBvcHVwKSB7XG4gICAgICAgIHBvcHVwLnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlzQWRkaW5nQ2lyY2xlID0gIWlzQWRkaW5nQ2lyY2xlO1xuICB9O1xuXG4gIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgY29udGVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQ29udGVudENsaWNrKTtcblxuICAgIGRyb3Bkb3duQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBkcm9wZG93bk1lbnUuY2xhc3NMaXN0LnRvZ2dsZShcInNob3dcIik7XG4gICAgICBkcm9wZG93bkJ1dHRvbi50ZXh0Q29udGVudCA9IGRyb3Bkb3duTWVudS5jbGFzc0xpc3QuY29udGFpbnMoXCJzaG93XCIpXG4gICAgICAgID8gXCLilrIgSGlkZSBDaGFyYWN0ZXJzIOKWslwiXG4gICAgICAgIDogXCLilrwgU2hvdyBDaGFyYWN0ZXJzIOKWvFwiO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgaW5pdCxcbiAgfTtcbn0pKCk7XG5cbkNvbnRyb2xsZXIuaW5pdCgpO1xuIl0sIm5hbWVzIjpbImNvbnNvbGUiLCJsb2ciLCJSZW5kZXJlciIsImNvbnRlbnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY3JlYXRlRmVlZGJhY2tNc2ciLCJtZXNzYWdlIiwiZmVlZGJhY2tNc2ciLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwidGV4dENvbnRlbnQiLCJhcHBlbmRDaGlsZCIsInNldFRpbWVvdXQiLCJzdHlsZSIsIm9wYWNpdHkiLCJyZW1vdmUiLCJjcmVhdGVQb3B1cCIsIngiLCJ5IiwicG9wdXAiLCJsZWZ0IiwidG9wIiwiZm9yRWFjaCIsIm9wdGlvbiIsImNob2ljZSIsImhyZWYiLCJhZGRFdmVudExpc3RlbmVyIiwiZHJvcGRvd25CdXR0b24iLCJkcm9wZG93bk1lbnUiLCJiYWNrZ3JvdW5kSW1nIiwiaXNBZGRpbmdDaXJjbGUiLCJjaXJjbGVzIiwiaGFuZGxlQ29udGVudENsaWNrIiwiZXZlbnQiLCJ0YXJnZXQiLCJjbG9zZXN0IiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImNsaWVudFgiLCJjbGllbnRZIiwiY2lyY2xlIiwicHVzaCIsImNyZWF0ZUNpcmNsZSIsImxlbmd0aCIsImNpcmNsZVRvUmVtb3ZlIiwicG9wIiwicmVtb3ZlQ2hpbGQiLCJyZW1vdmVDaXJjbGUiLCJxdWVyeVNlbGVjdG9yIiwiaW5pdCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsImNvbnRhaW5zIl0sInNvdXJjZVJvb3QiOiIifQ==