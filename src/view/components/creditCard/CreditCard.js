import React from 'react';
import './CreditCard.css'
function CreditCard(props) {

    return (
        <div className={`creditcard ${props.flipped ? 'flipped' : ''}`} onClick={props.handleFlip}>
            <div className="front">
                <div id="ccsingle">
                    {
                        props.cardTopColor==="cyan"?<svg xmlns="http://www.w3.org/2000/svg" width="750" height="471" viewBox="0 0 750 471"> <g fill="none" fill-rule="evenodd"> <rect width="750" height="471" rx="40"></rect> <path fill="#D10429" d="M201.809581,55 L344.203266,55 C364.072152,55 376.490206,71.4063861 371.833436,91.4702467 L305.500331,378.94775 C300.843561,399.011611 280.871191,415.417997 261.002305,415.417997 L118.60862,415.417997 C98.7397339,415.417997 86.32168,399.011611 90.9784502,378.94775 L157.311555,91.4702467 C161.968325,71.3018868 181.837211,55 201.706097,55 L201.809581,55 Z"></path> <path fill="#022E64" d="M331.750074,55 L495.564902,55 C515.433788,55 506.430699,71.4063861 501.773929,91.4702467 L435.440824,378.94775 C430.784054,399.011611 432.232827,415.417997 412.363941,415.417997 L248.549113,415.417997 C228.576743,415.417997 216.262173,399.011611 221.022427,378.94775 L287.355531,91.4702467 C292.012302,71.3018868 311.881188,55 331.853558,55 L331.750074,55 Z"></path> <path fill="#076F74" d="M489.814981,55 L632.208666,55 C652.077552,55 664.495606,71.4063861 659.838836,91.4702467 L593.505731,378.94775 C588.848961,399.011611 568.876591,415.417997 549.007705,415.417997 L406.61402,415.417997 C386.64165,415.417997 374.32708,399.011611 378.98385,378.94775 L445.316955,91.4702467 C449.973725,71.3018868 469.842611,55 489.711498,55 L489.814981,55 Z"></path> <path fill="#FEFEFE" d="M465.904754,326.014514 L479.357645,326.014514 L483.186545,312.952104 L469.837137,312.952104 L465.904754,326.014514 L465.904754,326.014514 Z M476.667067,290.066763 L476.667067,290.066763 L472.010297,305.532656 C472.010297,305.532656 477.081002,302.920174 479.875064,302.08418 C482.669126,301.457184 486.808478,300.934688 486.808478,300.934688 L490.016475,290.171263 L476.563583,290.171263 L476.667067,290.066763 Z M483.393513,267.912917 L483.393513,267.912917 L478.94371,282.751814 C478.94371,282.751814 483.910932,280.45283 486.704994,279.721335 C489.499056,278.98984 493.638407,278.780842 493.638407,278.780842 L496.846405,268.017417 L483.496997,268.017417 L483.393513,267.912917 Z M513.093359,267.912917 L513.093359,267.912917 L495.708083,325.910015 L500.364853,325.910015 L496.742921,337.927431 L492.086151,337.927431 L490.947829,341.584906 L474.390424,341.584906 L475.528745,337.927431 L442,337.927431 L445.311481,326.850508 L448.726446,326.850508 L466.318689,267.912917 L469.837137,256 L486.704994,256 L484.94577,261.956459 C484.94577,261.956459 489.395572,258.716981 493.741891,257.567489 C497.984726,256.417997 522.406899,256 522.406899,256 L518.784967,267.808418 L512.989875,267.808418 L513.093359,267.912917 Z"></path> <path fill="#FEFEFE" d="M520 256L538.006178 256 538.213146 262.792453C538.109662 263.941945 539.041016 264.464441 541.214175 264.464441L544.836108 264.464441 541.524627 275.645864 531.797151 275.645864C523.414965 276.272859 520.206968 272.615385 520.413935 268.539913L520.103484 256.104499 520 256zM522.216235 309.20029L505.037927 309.20029 507.935473 299.272859 527.597391 299.272859 530.391454 290.181422 511.039986 290.181422 514.351467 279 568.163034 279 564.851553 290.181422 546.741891 290.181422 543.947829 299.272859 562.057491 299.272859 559.056461 309.20029 539.498026 309.20029 535.979578 313.380261 543.947829 313.380261 545.914021 325.920174C546.120989 327.174165 546.120989 328.01016 546.534924 328.532656 546.948859 328.950653 549.328986 329.159652 550.674275 329.159652L553.054402 329.159652 549.328986 341.386067 543.223443 341.386067C542.292089 341.386067 540.843316 341.281567 538.877124 341.281567 537.014416 341.072569 535.77261 340.027576 534.530805 339.400581 533.392483 338.878084 531.736743 337.519594 531.322808 335.11611L529.4601 322.576197 520.560494 334.907112C517.766432 338.773585 513.937532 341.804064 507.418054 341.804064L495 341.804064 498.311481 330.936139 503.071735 330.936139C504.417024 330.936139 505.65883 330.413643 506.590184 329.891147 507.521538 329.473149 508.349408 329.055152 509.177278 327.696662L522.216235 309.20029 522.216235 309.20029zM334.31354 282L379.742921 282 376.43144 292.972424 358.321778 292.972424 355.527716 302.272859 374.154797 302.272859 370.739832 313.558781 352.216235 313.558781 347.662948 328.711176C347.145529 330.383164 352.112751 330.592163 353.871975 330.592163L363.185516 329.338171 359.4601 341.878084 338.556375 341.878084C336.900635 341.878084 335.65883 341.669086 333.796122 341.251089 332.036897 340.833091 331.209027 339.997097 330.48464 338.847605 329.760254 337.593614 328.518449 336.65312 329.346319 333.936139L335.348378 313.872279 325 313.872279 328.414965 302.377358 338.763343 302.377358 341.557405 293.076923 331.209027 293.076923 334.520508 282.104499 334.31354 282zM365.700875 262.165457L384.327956 262.165457 380.912991 273.555878 355.455981 273.555878 352.661919 275.959361C351.420113 277.108853 351.109662 276.690856 349.557405 277.526851 348.108632 278.258345 345.107603 279.721335 341.175219 279.721335L333 279.721335 336.311481 268.748911 338.795092 268.748911C340.864767 268.748911 342.31354 268.539913 343.037927 268.121916 343.865797 267.599419 344.797151 266.449927 345.728505 264.56894L350.385275 256 368.908872 256 365.700875 262.269956 365.700875 262.165457zM400.808726 280.975327C400.808726 280.975327 405.879431 276.272859 414.572069 274.809869 416.538261 274.391872 428.956314 274.600871 428.956314 274.600871L430.819023 268.330914 404.637626 268.330914 400.808726 281.079826 400.808726 280.975327zM425.437866 285.782293L425.437866 285.782293 399.463436 285.782293 397.91118 291.111756 420.470644 291.111756C423.161223 290.798258 423.678642 291.216255 423.885609 291.007257L425.54135 285.782293 425.437866 285.782293zM391.702153 256.104499L391.702153 256.104499 407.535171 256.104499 405.258528 264.150943C405.258528 264.150943 410.22575 260.075472 413.744198 258.612482 417.262647 257.358491 425.127414 256.104499 425.127414 256.104499L450.791393 256 441.995271 285.468795C440.546498 290.484761 438.787274 293.724238 437.752436 295.291727 436.821082 296.754717 435.68276 298.113208 433.406117 299.367199 431.232958 300.516691 429.266766 301.248186 427.404058 301.352685 425.748317 301.457184 423.057739 301.561684 419.53929 301.561684L394.806666 301.561684 387.873253 324.865022C387.25235 327.164006 386.941899 328.313498 387.355834 328.940493 387.666285 329.46299 388.597639 330.089985 389.735961 330.089985L400.601758 329.044993 396.876342 341.793904 384.665256 341.793904C380.732872 341.793904 377.93881 341.689405 375.972618 341.584906 374.10991 341.375907 372.143718 341.584906 370.798429 340.539913 369.660107 339.49492 367.900883 338.13643 368.004367 336.777939 368.10785 335.523948 368.625269 333.433962 369.45314 330.507983L391.702153 256.104499 391.702153 256.104499z"></path> <path fill="#FEFEFE" d="M437.840227 303L436.391454 310.105951C435.770551 312.300435 435.253132 313.972424 433.597391 315.435414 431.838167 316.898403 429.871975 318.465893 425.111721 318.465893L416.3156 318.88389 416.212116 326.825835C416.108632 329.020319 416.729535 328.811321 417.039986 329.229318 417.453921 329.647315 417.764373 329.751814 418.178308 329.960813L420.97237 329.751814 429.354556 329.333817 425.836108 341.037736 416.212116 341.037736C409.48567 341.037736 404.414965 340.828737 402.862708 339.574746 401.206968 338.529753 401 337.275762 401 334.976778L401.620903 303.835994 417.039986 303.835994 416.833019 310.21045 420.558435 310.21045C421.80024 310.21045 422.731594 310.105951 423.249013 309.792453 423.766432 309.478955 424.076883 308.956459 424.283851 308.224964L425.836108 303.208999 437.94371 303.208999 437.840227 303zM218.470396 147C217.952978 149.507983 208.018534 195.592163 208.018534 195.592163 205.845375 204.892598 204.293118 211.580552 199.118929 215.865022 196.117899 218.373004 192.599451 219.522496 188.563583 219.522496 182.044105 219.522496 178.318689 216.283019 177.697786 210.117562L177.594302 208.027576C177.594302 208.027576 179.560494 195.592163 179.560494 195.487663 179.560494 195.487663 189.908872 153.478955 191.771581 147.940493 191.875064 147.626996 191.875064 147.417997 191.875064 147.313498 171.695727 147.522496 168.073794 147.313498 167.866827 147 167.763343 147.417997 167.245924 150.030479 167.245924 150.030479L156.690578 197.36865 155.759224 201.339623 154 214.506531C154 218.373004 154.724386 221.612482 156.276643 224.224964 161.140381 232.793904 174.903724 234.047896 182.665008 234.047896 192.702935 234.047896 202.119959 231.853411 208.43247 227.986938 219.505234 221.403483 222.40278 211.058055 224.886391 201.966618L226.128196 197.264151C226.128196 197.264151 236.787026 153.687954 238.649734 148.044993 238.753218 147.731495 238.753218 147.522496 238.856702 147.417997 224.162004 147.522496 219.919169 147.417997 218.470396 147.104499L218.470396 147zM277.499056 233.622642C270.358675 233.518142 267.771581 233.518142 259.389394 233.936139L259.078943 233.309144C259.803329 230.069666 260.6312 226.934688 261.252102 223.69521L262.28694 219.306241C263.839197 212.513788 265.28797 204.467344 265.494937 202.063861 265.701905 200.600871 266.11584 196.943396 261.976489 196.943396 260.217264 196.943396 258.45804 197.77939 256.595332 198.615385 255.560494 202.272859 253.594302 212.513788 252.559465 217.111756 250.489789 226.934688 250.386305 228.08418 249.454951 232.891147L248.834048 233.518142C241.4867 233.413643 238.899605 233.413643 230.413935 233.83164L230 233.100145C231.448773 227.248186 232.794062 221.396226 234.139351 215.544267 237.6578 199.764877 238.589154 193.703919 239.520508 185.657475L240.244894 185.239478C248.523597 184.089985 250.489789 183.776488 259.492878 182L260.217264 182.835994 258.871975 187.851959C260.424232 186.911466 261.873005 185.970972 263.425262 185.239478 267.668097 183.149492 272.324867 182.522496 274.911962 182.522496 278.844345 182.522496 283.190664 183.671988 284.949888 188.269956 286.605629 192.345428 285.570791 197.361393 283.294148 207.288824L282.155826 212.30479C279.879183 223.381713 279.465248 225.367199 278.223443 232.891147L277.395572 233.518142 277.499056 233.622642zM306.558435 233.650218C302.212116 233.650218 299.418054 233.545718 296.727476 233.650218 294.036897 233.650218 291.449803 233.859216 287.413935 233.963716L287.206968 233.650218 287 233.232221C288.138322 229.05225 288.655741 227.58926 289.276643 226.12627 289.794062 224.66328 290.311481 223.20029 291.346319 218.91582 292.588124 213.377358 293.415995 209.510885 293.933413 206.062409 294.554316 202.822932 294.864767 200.001451 295.278703 196.761974L295.589154 196.552975 295.899605 196.239478C300.245924 195.612482 302.936502 195.194485 305.730565 194.776488 308.524627 194.358491 311.422173 193.835994 315.871975 193L316.078943 193.417997 316.182427 193.835994C315.354556 197.28447 314.526686 200.732946 313.698816 204.181422 312.870946 207.629898 312.043075 211.078374 311.318689 214.526851 309.766432 221.8418 309.042046 224.558781 308.731594 226.544267 308.317659 228.425254 308.214175 229.365747 307.593273 233.127721L307.179338 233.441219 306.765402 233.754717 306.558435 233.650218zM352.499319 207.975327C352.188868 209.856313 350.533127 216.857765 348.359968 219.783745 346.807711 221.978229 345.048487 223.33672 342.978811 223.33672 342.357909 223.33672 338.83946 223.33672 338.735976 218.007257 338.735976 215.394775 339.253395 212.677794 339.874298 209.751814 341.737006 201.287373 344.013649 194.285922 349.705257 194.285922 354.15506 194.285922 354.465511 199.510885 352.499319 207.975327L352.499319 207.975327zM371.229884 208.811321L371.229884 208.811321C373.713495 197.734398 371.747303 192.509434 369.367176 189.374456 365.64176 184.567489 359.018798 183 352.188868 183 348.049517 183 338.322041 183.417997 330.664241 190.523948 325.179601 195.644412 322.592506 202.645864 321.143733 209.333817 319.591476 216.12627 317.832252 228.352685 329.008501 232.950653 332.423466 234.413643 337.390687 234.83164 340.598684 234.83164 348.773903 234.83164 357.156089 232.532656 363.4686 225.844702 368.332338 220.41074 370.505497 212.259797 371.333368 208.811321L371.229884 208.811321zM545.661919 234.891147C536.969281 234.786647 534.48567 234.786647 526.517419 235.204644L526 234.577649C528.173159 226.322206 530.346319 217.962264 532.312511 209.602322 534.796122 198.734398 535.417024 194.13643 536.244894 187.761974L536.865797 187.239478C545.454951 185.985486 547.835078 185.671988 556.838167 184L557.045135 184.731495C555.389394 191.628447 553.837137 198.4209 552.181397 205.213353 548.869916 219.529753 547.731594 226.844702 546.489789 234.36865L545.661919 234.995646 545.661919 234.891147z"></path> <path fill="#FEFEFE" d="M533.159909 209.373777C532.745974 211.150265 531.090233 218.256216 528.917074 221.182195 527.468301 223.272181 523.949852 224.630672 521.983661 224.630672 521.362758 224.630672 517.947793 224.630672 517.740826 219.405708 517.740826 216.793226 518.258244 214.076245 518.879147 211.150265 520.741855 202.894822 523.018498 195.893371 528.710106 195.893371 533.159909 195.893371 535.126101 201.013836 533.159909 209.478277L533.159909 209.373777zM550.234733 210.209772L550.234733 210.209772C552.718344 199.132849 542.576933 209.269278 541.024677 205.611804 538.541066 199.864344 540.093322 188.369423 530.158879 184.50295 526.329979 182.935461 517.32689 184.920947 509.66909 192.026898 504.287934 197.042863 501.597355 204.044315 500.148582 210.732268 498.596326 217.420222 496.837101 229.751136 507.909866 234.035606 511.428315 235.603095 514.636312 236.021092 517.844309 235.812094 529.020558 235.185098 537.506228 218.151717 543.818739 211.463763 548.682476 206.1343 549.510347 213.449249 550.234733 210.209772L550.234733 210.209772zM420.292089 233.622642C413.151708 233.518142 410.668097 233.518142 402.28591 233.936139L401.975459 233.309144C402.699846 230.069666 403.527716 226.934688 404.252102 223.69521L405.183456 219.306241C406.735713 212.513788 408.28797 204.467344 408.391454 202.063861 408.598421 200.600871 409.012356 196.943396 404.976489 196.943396 403.217264 196.943396 401.354556 197.77939 399.595332 198.615385 398.663978 202.272859 396.594302 212.513788 395.559465 217.111756 393.593273 226.934688 393.386305 228.08418 392.454951 232.891147L391.834048 233.518142C384.4867 233.413643 381.899605 233.413643 373.413935 233.83164L373 233.100145C374.448773 227.248186 375.794062 221.396226 377.139351 215.544267 380.6578 199.764877 381.48567 193.703919 382.520508 185.657475L383.141411 185.239478C391.420113 184.089985 393.489789 183.776488 402.389394 182L403.113781 182.835994 401.871975 187.851959C403.320748 186.911466 404.873005 185.970972 406.321778 185.239478 410.564613 183.149492 415.221383 182.522496 417.808478 182.522496 421.740862 182.522496 425.983697 183.671988 427.846405 188.269956 429.502145 192.345428 428.363824 197.361393 426.08718 207.288824L424.948859 212.30479C422.568732 223.381713 422.25828 225.367199 421.016475 232.891147L420.188605 233.518142 420.292089 233.622642zM482.293118 147.104499L476.291059 147.208999C460.768492 147.417997 454.559465 147.313498 452.075854 147 451.868886 148.149492 451.454951 150.134978 451.454951 150.134978 451.454951 150.134978 445.866827 176.050798 445.866827 176.155298 445.866827 176.155298 432.620903 231.330914 432 233.943396 445.556375 233.734398 451.041016 233.734398 453.421143 234.047896 453.938562 231.435414 457.043075 216.07402 457.146559 216.07402 457.146559 216.07402 459.837137 204.788099 459.940621 204.370102 459.940621 204.370102 460.768492 203.22061 461.596362 202.698113L462.838167 202.698113C474.531835 202.698113 487.674275 202.698113 498.022653 195.069666 505.05955 189.844702 509.819804 182.007257 511.992964 172.602322 512.510383 170.303338 512.924318 167.586357 512.924318 164.764877 512.924318 161.107402 512.199931 157.554427 510.130256 154.732946 504.852583 147.313498 494.400721 147.208999 482.293118 147.104499L482.293118 147.104499zM490.054402 174.169811L490.054402 174.169811C488.812597 179.917271 485.08718 184.828737 480.326926 187.127721 476.394543 189.113208 471.634289 189.322206 466.667067 189.322206L463.45907 189.322206 463.666037 188.068215C463.666037 188.068215 469.564613 162.152395 469.564613 162.256894L469.771581 160.898403 469.875064 159.853411 472.255191 160.062409C472.255191 160.062409 484.466278 161.107402 484.673245 161.107402 489.433499 162.988389 491.503175 167.795356 490.054402 174.169811L490.054402 174.169811zM617.261369 182.835994L616.536983 182C607.740862 183.776488 606.085121 184.089985 598.013386 185.239478L597.392483 185.866473C597.392483 185.970972 597.288999 186.075472 597.288999 186.28447L597.288999 186.179971C591.28694 200.287373 591.390424 197.256894 586.526686 208.333817 586.526686 207.811321 586.526686 207.497823 586.423202 206.975327L585.181397 182.940493 584.45701 182.104499C575.14347 183.880987 574.936502 184.194485 566.450832 185.343977L565.82993 185.970972C565.726446 186.28447 565.726446 186.597968 565.726446 186.911466L565.82993 187.015965C566.864767 192.554427 566.6578 191.300435 567.692638 199.973875 568.210057 204.258345 568.830959 208.542816 569.348378 212.722787 570.176248 219.828737 570.693667 223.277213 571.728505 234.040639 565.933413 243.654572 564.588124 247.312046 559 255.776488L559.310451 256.612482C567.692638 256.298984 569.555346 256.298984 575.764373 256.298984L577.109662 254.731495C581.766432 244.595065 617.364853 182.940493 617.364853 182.940493L617.261369 182.835994zM314.543608 189.75837C319.303862 186.414394 319.924765 181.816425 315.888897 179.412942 311.85303 177.009459 304.712649 177.740954 299.952395 181.084931 295.192141 184.324408 294.674722 188.922376 298.71059 191.430359 302.642973 193.729343 309.783354 193.102347 314.543608 189.75837L314.543608 189.75837z"></path> <path fill="#FEFEFE" d="M575.734683,256.104499 L568.80127,268.121916 C566.628111,272.197388 562.488759,275.332366 556.072765,275.332366 L545,275.123367 L548.207997,264.255443 L550.381157,264.255443 C551.519478,264.255443 552.347349,264.150943 552.968251,263.837446 C553.589154,263.628447 553.899605,263.21045 554.417024,262.583454 L558.556375,256 L575.838167,256 L575.734683,256.104499 Z"></path> </g></svg>
                        :props.cardTopColor==="lightblue"?<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="482.51" height="374" viewBox="0 0 482.51 374"> <title>mastercard</title> <g> <path d="M220.13,421.67V396.82c0-9.53-5.8-15.74-15.32-15.74-5,0-10.35,1.66-14.08,7-2.9-4.56-7-7-13.25-7a14.07,14.07,0,0,0-12,5.8v-5h-7.87v39.76h7.87V398.89c0-7,4.14-10.35,9.94-10.35s9.11,3.73,9.11,10.35v22.78h7.87V398.89c0-7,4.14-10.35,9.94-10.35s9.11,3.73,9.11,10.35v22.78Zm129.22-39.35h-14.5v-12H327v12h-8.28v7H327V408c0,9.11,3.31,14.5,13.25,14.5A23.17,23.17,0,0,0,351,419.6l-2.49-7a13.63,13.63,0,0,1-7.46,2.07c-4.14,0-6.21-2.49-6.21-6.63V389h14.5v-6.63Zm73.72-1.24a12.39,12.39,0,0,0-10.77,5.8v-5h-7.87v39.76h7.87V399.31c0-6.63,3.31-10.77,8.7-10.77a24.24,24.24,0,0,1,5.38.83l2.49-7.46a28,28,0,0,0-5.8-.83Zm-111.41,4.14c-4.14-2.9-9.94-4.14-16.15-4.14-9.94,0-16.15,4.56-16.15,12.43,0,6.63,4.56,10.35,13.25,11.6l4.14.41c4.56.83,7.46,2.49,7.46,4.56,0,2.9-3.31,5-9.53,5a21.84,21.84,0,0,1-13.25-4.14l-4.14,6.21c5.8,4.14,12.84,5,17,5,11.6,0,17.81-5.38,17.81-12.84,0-7-5-10.35-13.67-11.6l-4.14-.41c-3.73-.41-7-1.66-7-4.14,0-2.9,3.31-5,7.87-5,5,0,9.94,2.07,12.43,3.31Zm120.11,16.57c0,12,7.87,20.71,20.71,20.71,5.8,0,9.94-1.24,14.08-4.56l-4.14-6.21a16.74,16.74,0,0,1-10.35,3.73c-7,0-12.43-5.38-12.43-13.25S445,389,452.07,389a16.74,16.74,0,0,1,10.35,3.73l4.14-6.21c-4.14-3.31-8.28-4.56-14.08-4.56-12.43-.83-20.71,7.87-20.71,19.88h0Zm-55.5-20.71c-11.6,0-19.47,8.28-19.47,20.71s8.28,20.71,20.29,20.71a25.33,25.33,0,0,0,16.15-5.38l-4.14-5.8a19.79,19.79,0,0,1-11.6,4.14c-5.38,0-11.18-3.31-12-10.35h29.41v-3.31c0-12.43-7.46-20.71-18.64-20.71h0Zm-.41,7.46c5.8,0,9.94,3.73,10.35,9.94H364.68c1.24-5.8,5-9.94,11.18-9.94ZM268.59,401.79V381.91h-7.87v5c-2.9-3.73-7-5.8-12.84-5.8-11.18,0-19.47,8.7-19.47,20.71s8.28,20.71,19.47,20.71c5.8,0,9.94-2.07,12.84-5.8v5h7.87V401.79Zm-31.89,0c0-7.46,4.56-13.25,12.43-13.25,7.46,0,12,5.8,12,13.25,0,7.87-5,13.25-12,13.25-7.87.41-12.43-5.8-12.43-13.25Zm306.08-20.71a12.39,12.39,0,0,0-10.77,5.8v-5h-7.87v39.76H532V399.31c0-6.63,3.31-10.77,8.7-10.77a24.24,24.24,0,0,1,5.38.83l2.49-7.46a28,28,0,0,0-5.8-.83Zm-30.65,20.71V381.91h-7.87v5c-2.9-3.73-7-5.8-12.84-5.8-11.18,0-19.47,8.7-19.47,20.71s8.28,20.71,19.47,20.71c5.8,0,9.94-2.07,12.84-5.8v5h7.87V401.79Zm-31.89,0c0-7.46,4.56-13.25,12.43-13.25,7.46,0,12,5.8,12,13.25,0,7.87-5,13.25-12,13.25-7.87.41-12.43-5.8-12.43-13.25Zm111.83,0V366.17h-7.87v20.71c-2.9-3.73-7-5.8-12.84-5.8-11.18,0-19.47,8.7-19.47,20.71s8.28,20.71,19.47,20.71c5.8,0,9.94-2.07,12.84-5.8v5h7.87V401.79Zm-31.89,0c0-7.46,4.56-13.25,12.43-13.25,7.46,0,12,5.8,12,13.25,0,7.87-5,13.25-12,13.25C564.73,415.46,560.17,409.25,560.17,401.79Z" transform="translate(-132.74 -48.5)"></path> <g> <rect x="169.81" y="31.89" width="143.72" height="234.42" fill="#ff5f00"></rect> <path d="M317.05,197.6A149.5,149.5,0,0,1,373.79,80.39a149.1,149.1,0,1,0,0,234.42A149.5,149.5,0,0,1,317.05,197.6Z" transform="translate(-132.74 -48.5)" fill="#eb001b"></path> <path d="M615.26,197.6a148.95,148.95,0,0,1-241,117.21,149.43,149.43,0,0,0,0-234.42,148.95,148.95,0,0,1,241,117.21Z" transform="translate(-132.74 -48.5)" fill="#f79e1b"></path> </g> </g></svg>
                        :props.cardTopColor==="lime"? <svg
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="750px"
                        height="471px"
                        viewBox="0 0 750 471"
                        enableBackground="new 0 0 750 471"
                        xmlSpace="preserve"
                      >
                        <title>Slice 1</title>
                        <desc>Created with Sketch.</desc>
                        <g id="visa" >
                          <path
                            id="Shape"
                            fill="#0E4595"
                            d="M278.198,334.228l33.36-195.763h53.358l-33.384,195.763H278.198L278.198,334.228z"
                          ></path>
                          <path
                            id="path13"
                            
                            fill="#0E4595"
                            d="M524.307,142.687c-10.57-3.966-27.135-8.222-47.822-8.222c-52.725,0-89.863,26.551-90.18,64.604c-0.297,28.129,26.514,43.821,46.754,53.185c20.77,9.597,27.752,15.716,27.652,24.283c-0.133,13.123-16.586,19.116-31.924,19.116c-21.355,0-32.701-2.967-50.225-10.274l-6.877-3.112l-7.488,43.823c12.463,5.466,35.508,10.199,59.438,10.445c56.09,0,92.502-26.248,92.916-66.884c0.199-22.27-14.016-39.216-44.801-53.188c-18.65-9.056-30.072-15.099-29.951-24.269c0-8.137,9.668-16.838,30.559-16.838c17.447-0.271,30.088,3.534,39.936,7.5l4.781,2.259L524.307,142.687"
                          ></path>
                          <path
                            id="Path"
                          
                            fill="#0E4595"
                            d="M661.615,138.464h-41.23c-12.773,0-22.332,3.486-27.941,16.234l-79.244,179.402h56.031c0,0,9.16-24.121,11.232-29.418c6.123,0,60.555,0.084,68.336,0.084c1.596,6.854,6.492,29.334,6.492,29.334h49.512L661.615,138.464L661.615,138.464z M596.198,264.872c4.414-11.279,21.26-54.724,21.26-54.724c-0.314,0.521,4.381-11.334,7.074-18.684l3.607,16.878c0,0,10.217,46.729,12.352,56.527h-44.293V264.872L596.198,264.872z"
                          ></path>
                          <path
                            id="path16"
                            
                            fill="#0E4595"
                            d="M232.903,138.464L180.664,271.96l-5.565-27.129c-9.726-31.274-40.025-65.157-73.898-82.12l47.767,171.204l56.455-0.064l84.004-195.386L232.903,138.464"
                          ></path>
                          <path
                            id="path18"
                            
                            fill="#F2AE14"
                            d="M131.92,138.464H45.879l-0.682,4.073c66.939,16.204,111.232,55.363,129.618,102.415l-18.709-89.96C152.877,142.596,143.509,138.896,131.92,138.464"
                          ></path>
                        </g>
                      </svg>:<div></div>
                    
                    }
                </div>
                <svg version="1.1" id="cardfront" xmlns="http://www.w3.org/2000/svg"
                    x="0px" y="0px" viewBox="0 0 750 471" style={{ enableBackground: "new 0 0 750 471" }} >
                    <g id="Front">
                        <g id="CardBackground">
                            <g id="Page-1_1_">
                                <g id="amex_1_">
                                    <path id="Rectangle-1_1_" className={`lightcolor ${props.cardTopColor}`} d="M40,0h670c22.1,0,40,17.9,40,40v391c0,22.1-17.9,40-40,40H40c-22.1,0-40-17.9-40-40V40
C0,17.9,17.9,0,40,0z" />
                                </g>
                            </g>
                            <path className={`darkcolor ${props.cardBottomColor}`} d="M750,431V193.2c-217.6-57.5-556.4-13.5-750,24.9V431c0,22.1,17.9,40,40,40h670C732.1,471,750,453.1,750,431z" />
                        </g>
                        <text transform="matrix(1 0 0 1 60.106 295.0121)" id="svgnumber" className="st2 st3 st4">{props.cardNumber}</text>
                        <text transform="matrix(1 0 0 1 54.1064 428.1723)" id="svgname" className="st2 st5 st6">{props.cardHolder}</text>
                        <text transform="matrix(1 0 0 1 54.1074 389.8793)" className="st7 st5 st8">cardholder name</text>
                        <text transform="matrix(1 0 0 1 479.7754 388.8793)" className="st7 st5 st8">expiration</text>
                        <text transform="matrix(1 0 0 1 65.1054 241.5)" className="st7 st5 st8">card number</text>
                        <g>
                            <text transform="matrix(1 0 0 1 574.4219 433.8095)" id="svgexpire" className="st2 st5 st9">{props.expirationDate}</text>
                            <text transform="matrix(1 0 0 1 479.3848 417.0097)" className="st2 st10 st11">VALID</text>
                            <text transform="matrix(1 0 0 1 479.3848 435.6762)" className="st2 st10 st11">THRU</text>
                            <polygon className="st2" points="554.5,421 540.4,414.2 540.4,427.9 		" />
                        </g>
                        <g id="cchip">
                            <g>
                                <path className="st2" d="M168.1,143.6H82.9c-10.2,0-18.5-8.3-18.5-18.5V74.9c0-10.2,8.3-18.5,18.5-18.5h85.3
c10.2,0,18.5,8.3,18.5,18.5v50.2C186.6,135.3,178.3,143.6,168.1,143.6z" />
                            </g>
                            <g>
                                <g>
                                    <rect x="82" y="70" className="st12" width="1.5" height="60" />
                                </g>
                                <g>
                                    <rect x="167.4" y="70" className="st12" width="1.5" height="60" />
                                </g>
                                <g>
                                    <path className="st12" d="M125.5,130.8c-10.2,0-18.5-8.3-18.5-18.5c0-4.6,1.7-8.9,4.7-12.3c-3-3.4-4.7-7.7-4.7-12.3
c0-10.2,8.3-18.5,18.5-18.5s18.5,8.3,18.5,18.5c0,4.6-1.7,8.9-4.7,12.3c3,3.4,4.7,7.7,4.7,12.3
C143.9,122.5,135.7,130.8,125.5,130.8z M125.5,70.8c-9.3,0-16.9,7.6-16.9,16.9c0,4.4,1.7,8.6,4.8,11.8l0.5,0.5l-0.5,0.5
c-3.1,3.2-4.8,7.4-4.8,11.8c0,9.3,7.6,16.9,16.9,16.9s16.9-7.6,16.9-16.9c0-4.4-1.7-8.6-4.8-11.8l-0.5-0.5l0.5-0.5
c3.1-3.2,4.8-7.4,4.8-11.8C142.4,78.4,134.8,70.8,125.5,70.8z" />
                                </g>
                                <g>
                                    <rect x="82.8" y="82.1" className="st12" width="25.8" height="1.5" />
                                </g>
                                <g>
                                    <rect x="82.8" y="117.9" className="st12" width="26.1" height="1.5" />
                                </g>
                                <g>
                                    <rect x="142.4" y="82.1" className="st12" width="25.8" height="1.5" />
                                </g>
                                <g>
                                    <rect x="142" y="117.9" className="st12" width="26.2" height="1.5" />
                                </g>
                            </g>
                        </g>
                    </g>
                    <g id="Back">
                    </g>
                </svg>
            </div>
            <div className="back">
                <svg version="1.1" id="cardback" xmlns="http://www.w3.org/2000/svg"
                    x="0px" y="0px" viewBox="0 0 750 471" style={{ enableBackground: "new 0 0 750 471" }} >
                    <g id="Front">
                        <line className="st0" x1="35.3" y1="10.4" x2="36.7" y2="11" />
                    </g>
                    <g id="Back">
                        <g id="Page-1_2_">
                            <g id="amex_2_">
                                <path id="Rectangle-1_2_" className={`darkcolor ${props.cardBottomColor}`} d="M40,0h670c22.1,0,40,17.9,40,40v391c0,22.1-17.9,40-40,40H40c-22.1,0-40-17.9-40-40V40
C0,17.9,17.9,0,40,0z" />
                            </g>
                        </g>
                        <rect y="61.6" className="st2" width="750" height="78" />
                        <g>
                            <path className="st3" d="M701.1,249.1H48.9c-3.3,0-6-2.7-6-6v-52.5c0-3.3,2.7-6,6-6h652.1c3.3,0,6,2.7,6,6v52.5
C707.1,246.4,704.4,249.1,701.1,249.1z" />
                            <rect x="42.9" y="198.6" className="st4" width="664.1" height="10.5" />
                            <rect x="42.9" y="224.5" className="st4" width="664.1" height="10.5" />
                            <path className="st5" d="M701.1,184.6H618h-8h-10v64.5h10h8h83.1c3.3,0,6-2.7,6-6v-52.5C707.1,187.3,704.4,184.6,701.1,184.6z" />
                        </g>
                        <text transform="matrix(1 0 0 1 621.999 227.2734)" id="svgsecurity" className="st6 st7">{props.ccv2}</text>
                        <g className="st8">
                            <text transform="matrix(1 0 0 1 518.083 280.0879)" className="st9 st6 st10">security code</text>
                        </g>
                        <rect x="58.1" y="378.6" className="st11" width="375.5" height="13.5" />
                        <rect x="58.1" y="405.6" className="st11" width="421.7" height="13.5" />
                        <text transform="matrix(1 0 0 1 59.5073 228.6099)" id="svgnameback" className="st12 st13">{props.cardHolder}</text>
                    </g>
                </svg>
            </div>
        </div>
    );
}

export default CreditCard;